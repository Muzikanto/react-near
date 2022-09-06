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
   'nft_on_transfer',
   'nft_on_approve',
];

if (!fs.existsSync(path.resolve(dist))) {
   fs.mkdirSync(dist);
}

//

(async () => {
   for (const contract of config.contracts) {
      let schema = contract.abi
         ? JSON.parse(fs.readFileSync(path.resolve(contract.abi), { encoding: 'utf-8' }))
         : await loadAbi(contract.contractId);

      if (!schema) {
         console.log(`Invalid schema of ${contract.contractId}`);
         process.exit(1);
      }

      await generate(schema, contract.name, contract.contractId);
   }
})();

//

async function generate(abiSchema, contractName, contractId) {
   const schemaPath = path.resolve(dist, `${camelToSnakeCase(contractName)}.ts`);

   const schema = {
      ...abiSchema.body.root_schema,
      title: 'Definitions',
      type: 'object',
      properties: abiSchema.body.root_schema.definitions,
   };
   const methods = abiSchema.body.functions.filter((el) => !excludeMethods.includes(el.name));

   let code = generateImports();

   code += '\n\n' + generateConstants(contractId, contractName);

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

   code += '\n\n' + generateContract(methods, contractName);

   code += '\n\n' + generateHooks(contractName);

   code += '\n\n' + generateMethods(methods, contractName);

   const ts = await compile(schema, 'MySchema', { additionalProperties: false, bannerComment: '' });
   code += `\n\n` + ts;

   fs.writeFileSync(schemaPath, prepareCode(code));

   console.log(`${contractId} schema generated!`);
}

function generateImports() {
   return [
      `import { useNearQuery, useNearMutation, useNearContract } from "react-near";`,
      'import { NearQueryOptions } from "react-near/hooks/query";',
      'import { NearMutationOptions } from "react-near/hooks/mutation";',
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

function generateMethods(methods, contractName) {
   return methods.map((el) => getFunction(el, contractName)).join('\n\n');
}

function generateContract(methods, contractName) {
   return [
      `export function use${contractName}Contract() {`,
      '  return (',
      `    useNearContract(${getContractId(contractName)}, {`,
      `      viewMethods: [\n${methods
         .filter((el) => el.is_view)
         .map((el) => `        ${contractName}ViewMethods.${el.name},`)
         .join('\n')}\n      ],`,
      `      changeMethods: [\n${methods
         .filter((el) => !el.is_view)
         .map((el) => `        ${contractName}ChangeMethods.${el.name},`)
         .join('\n')}\n      ],`,
      '    }',
      '  ));',
      '}',
   ].join('\n');
}

function generateConstants(contractId, contractName) {
   return `export const ${getContractId(contractName)} = '${contractId}';`;
}

function generateHooks(contractName) {
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

//

function getFunction(el, contractName) {
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

   return [
      `// ${el.name} ${isQuery ? 'query' : 'mutation'}${el.is_payable ? ' (payable)' : ''}`,
      '',
      `export type ${interfaceName}Args = {\n${Object.keys(args)
         .map((k) => `   ${k}: ${args[k]};`)
         .join('\n')}\n};`,
      '',
      `export type ${interfaceName}Result = ${formatParam(el.result)};`,
      '',
      `export function use${name}${isQuery ? 'Query' : 'Mutation'}(opts: Near${
         isQuery ? 'Query' : 'Mutation'
      }Options<${interfaceName}Result, ${interfaceName}Args>) {`,
      `    return use${contractName}${
         isQuery ? 'QueryRaw' : 'MutationRaw'
      }<${interfaceName}Result, ${interfaceName}Args>(${contractName}${
         isQuery ? 'View' : 'Change'
      }Methods.${el.name}, opts);`,
      `}`,
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
