#!/usr/bin/env node

const { compile } = require('json-schema-to-typescript');
const fs = require('fs');
const path = require('path');
const fzstd = require('fzstd');
const nearApi = require('near-api-js');

const networks = {
   mainnet: 'https://rpc.mainnet.near.org',
   testnet: 'https://rpc.testnet.near.org',
   betanet: 'https://rpc.betanet.near.org',
   local: 'http://localhost:3030',
};

const pathToConfig = path.resolve('react-near.json');
const config = JSON.parse(fs.readFileSync(pathToConfig, { encoding: 'utf-8' }));

const dist = config.dist || 'dist';
const excludeMethods = [
   'new',
   'new_with_default_meta',
   'migrate',
   'ft_on_transfer',
   'mt_on_transfer',
   'nft_on_transfer',
   'nft_on_approve',
];

if (!fs.existsSync(path.resolve(dist))) {
   fs.mkdirSync(dist);
}

//

const parseConfigs = {
   default: {
      getMethod: getMethodDefault,
      getContract: getContractDefault,
      getStartCode: getStartCodeDefault,
      getCoreCode: getCoreCodeDefault,
   },
   raw: {
      getMethod: () => '',
      getContract: getContractRaw,
      getStartCode: getStartCodeRaw,
      getCoreCode: () => '',
   },
};

(async () => {
   for (const contract of config.contracts) {
      let schema = contract.abi
         ? JSON.parse(fs.readFileSync(path.resolve(contract.abi), { encoding: 'utf-8' }))
         : await loadAbi(contract.contractId);

      if (!schema) {
         console.log(`Invalid schema of ${contract.contractId}`);
         process.exit(1);
      }

      const configParse = parseConfigs[config.type || 'default'];

      if (!configParse) {
         throw new Error('Invalid react-near config "type" field.');
      }

      await generate(schema, contract.name, contract.contractId, configParse);
   }
})();

//

async function generate(abiSchema, contractName, contractId, opts) {
   const schemaPath = path.resolve(dist, `${camelToSnakeCase(contractName)}.ts`);

   const schema = {
      ...abiSchema.body.root_schema,
      title: 'Definitions',
      type: 'object',
      properties: abiSchema.body.root_schema.definitions,
   };
   const methods = abiSchema.body.functions.filter((el) => !excludeMethods.includes(el.name));

   let code = opts.getStartCode({ contractName });

   code = (code ? code + '\n\n' : '') + generateConstants(contractId, contractName);

   code +=
      '\n\n' +
      generateEnumMethods(
         methods.filter((el) => el.is_view),
         contractName,
         'View',
      ) +
      '\n\n' +
      generateEnumMethods(
         methods.filter((el) => !el.is_view),
         contractName,
         'Change',
      );

   code += '\n\n' + generateContractInterface(methods, contractName);

   code += '\n\n' + generateContract({ methods, contractName, getContract: opts.getContract });

   code += '\n\n' + opts.getCoreCode({ contractName });

   code += '\n\n' + generateMethods({ methods, contractName, getMethod: opts.getMethod });

   const ts = await compile(schema, 'MySchema', { additionalProperties: false, bannerComment: '' });
   code += `\n\n` + ts;

   fs.writeFileSync(schemaPath, prepareCode(code));

   console.log(`${contractId} schema generated!`);
}

function generateContractInterface(methods, contractName) {
   return [
      `export interface I${contractName}Contract {`,
      '   // view methods',
      methods
         .filter((el) => el.is_view)
         .map((el) => {
            const name = formatFunctionName(el.name);
            const interfaceName = 'I' + name;

            return `   ${el.name}(args: ${interfaceName}Args): ${interfaceName}Result`;
         })
         .join('\n'),
      '   // change methods',
      methods
         .filter((el) => !el.is_view)
         .map((el) => {
            const name = formatFunctionName(el.name);
            const interfaceName = 'I' + name;

            return `   ${el.name}(args: ${interfaceName}Args): ${interfaceName}Result`;
         })
         .join('\n'),
      '}',
   ].join('\n');
}

function generateEnumMethods(methods, contractName, prefix) {
   let methodsCode = `export enum ${contractName}${prefix}Methods {\n`;

   methods.forEach((func) => {
      methodsCode += `  ${func.name} = '${func.name}',${func.is_payable ? ' // payable' : ''}\n`;
   });

   methodsCode += '}';

   return methodsCode;
}

function generateMethods({ methods, contractName, getMethod }) {
   return methods.map((el) => getMethodWithTypes({ el, contractName, getMethod })).join('\n\n');
}

function generateContract({ methods, contractName, getContract }) {
   return getContract({
      contractName,
      viewMethods: methods
         .filter((el) => el.is_view)
         .map((el) => `        ${contractName}ViewMethods.${el.name},`),
      changeMethods: methods
         .filter((el) => !el.is_view)
         .map((el) => `        ${contractName}ChangeMethods.${el.name},`),
      interfaceName: `I${contractName}Contract`,
   });
}

function generateConstants(contractId, contractName) {
   return `export const ${getContractId(contractName)} = '${contractId}';`;
}

//

function getMethodWithTypes({ el, contractName, getMethod }) {
   const name = formatFunctionName(el.name);
   const interfaceName = 'I' + name;
   const args = (el.params || []).reduce(
      (acc, el2) => ({
         ...acc,
         [el2.name]: formatParam(el2),
      }),
      {},
   );
   const isQuery = el.is_view;

   const methodArgs = {
      functionName: name,
      methodName: el.name,
      contractName,
      isView: !!el.is_view,
      isChange: !el.is_view,
      isPayable: !!el.is_payable,
      raw: el,
      argsInterface: `${interfaceName}Args`,
      resultInterface: `${interfaceName}Result`,
   };

   return [
      `// ${el.name} ${isQuery ? 'query' : 'mutation'}${el.is_payable ? ' (payable)' : ''}`,
      '',
      `export type ${interfaceName}Args = {\n${Object.keys(args)
         .map((k) => `   ${k}: ${args[k]};`)
         .join('\n')}\n};`,
      '',
      `export type ${interfaceName}Result = ${formatParam(el.result)};`,
      '',
      getMethod(methodArgs),
   ].join('\n');
}

function formatParam(el) {
   if (!el) {
      return 'void';
   }
   if (el.type_schema.type) {
      if (el.type_schema.type === 'array') {
         if (el.type_schema.items.type) {
            return `${el.type_schema.items.type}[]`;
         }
         return `${el.type_schema.items.$ref.split('/').slice(-1)[0]}[]`;
      }
      if (Array.isArray(el.type_schema.type)) {
         return `${el.type_schema.type
            .map((el) => {
               if (el === 'integer') {
                  return 'number';
               }

               return el;
            })
            .join(' | ')}`;
      }

      return el.type_schema.type;
   }
   if (el.type_schema.$ref) {
      let res = el.type_schema.$ref.split('/').slice(-1)[0];

      if (res === 'Promise') {
         return 'void';
      }

      return res;
   }
   if (el.type_schema.anyOf) {
      return `${el.type_schema.anyOf
         .map((el) => {
            if (el.type) {
               return el.type;
            } else if (el.$ref) {
               const res = `${el.$ref.split('/').slice(-1)[0]}`;

               if (res === 'Promise') {
                  return 'void';
               }

               return res;
            }
         })
         .join(' | ')}`;
   }

   return null;
}

function formatFunctionName(str) {
   let res = str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

   return res.slice(0, 1).toUpperCase() + res.slice(1);
}

function getContractId(contractId) {
   return camelToSnakeCase(contractId).toUpperCase() + '_CONTRACT_NAME';
}

function camelToSnakeCase(str) {
   return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).slice(1);
}

async function loadAbi(contractId) {
   const network = (contractId.includes('.') && contractId.split('.').slice(-1)[0]) || 'testnet';

   let near = await nearApi.connect({
      keyStore: nearApi.keyStores.InMemoryKeyStore,
      nodeUrl: new URL(network in networks ? networks[network] : network),
   });

   let account = await near.account(contractId);
   let response = await account.viewFunction(contractId, '__contract_abi', {}, { parse: (v) => v });

   let decompressed_abi = fzstd.decompress(response);
   let abi = JSON.parse(Buffer.from(decompressed_abi).toString());

   return abi;
}

function prepareCode(ts) {
   return (
      ts
         .replace('export type U128 = number;', 'export type U128 = string;')
         .replace('export type U64 = number;', 'export type U64 = string;')
         .replace(
            'export type PromiseOrValueU128 = number;',
            'export type PromiseOrValueU128 = string;',
         )
         .split('PromiseOrValueArray_of')
         .join('PromiseOrValueArrayOf') +
      '\n' +
      ['type integer = number;'].join('\n')
   );
}

// override

function getMethodDefault({
   functionName,
   methodName,
   isView,
   isChange,
   isPayable,
   contractName,
   raw,
   argsInterface,
   resultInterface,
}) {
   return [
      `export function use${functionName}${isView ? 'Query' : 'Mutation'}(opts: Near${
         isView ? 'Query' : 'Mutation'
      }Options<${resultInterface}, ${argsInterface}>) {`,
      `    return use${contractName}${
         isView ? 'QueryRaw' : 'MutationRaw'
      }<${resultInterface}, ${argsInterface}>(${contractName}${
         isView ? 'View' : 'Change'
      }Methods.${methodName}, opts);`,
      `}`,
   ].join('\n');
}

function getContractDefault({ contractName, interfaceName, viewMethods, changeMethods }) {
   return [
      `export function use${contractName}Contract() {`,
      '  return (',
      `    useNearContract<I${contractName}Contract>(${getContractId(contractName)}, {`,
      `      viewMethods: [\n${viewMethods.join('\n')}\n      ],`,
      `      changeMethods: [\n${changeMethods.join('\n')}\n      ],`,
      '    }',
      '  ));',
      '}',
   ].join('\n');
}

function getCoreCodeDefault({ contractName }) {
   return `export function use${contractName}QueryRaw<Res = any, Req = any>(
  methodName: ${contractName}ViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = use${contractName}Contract();

  return useNearQuery(methodName, { contract, ...opts });
}

export function use${contractName}MutationRaw<Res = any, Req = any>(
  methodName: ${contractName}ChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = use${contractName}Contract();

  return useNearMutation(methodName, { contract, ...opts });
}`;
}

function getStartCodeDefault({ contractName }) {
   return [
      `import { useNearQuery, useNearMutation, useNearContract } from "react-near";`,
      'import { NearQueryOptions } from "react-near/hooks/query";',
      'import { NearMutationOptions } from "react-near/hooks/mutation";',
   ].join('\n');
}

function getContractRaw({ contractName, viewMethods, changeMethods, interfaceName }) {
   return [
      `export function get${contractName}Contract(account: Account): Contract & ${interfaceName} {`,
      `  return new Contract(account, ${getContractId(contractName)}, {`,
      `      viewMethods: [\n${viewMethods.join('\n')}\n      ],`,
      `      changeMethods: [\n${changeMethods.join('\n')}\n      ],`,
      `    }) as Contract & ${interfaceName};`,
      '}',
   ].join('\n');
}

function getStartCodeRaw({ contractName }) {
   return `import { Contract, Account } from "near-api-js";`;
}
