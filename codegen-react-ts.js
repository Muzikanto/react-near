const codegenNearReactTs = {
    getMethod: getMethodDefault,
    getContract: getContractDefault,
    getStartCode: getStartCodeDefault,
    getCoreCode: getCoreCodeDefault,
};

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

function getContractDefault({ contractName, viewMethods, changeMethods, codegenName }) {
    return [
        `export function use${contractName}ContractId() {`,
        `  const nearEnv = useNearEnvironment();`,
        '',
        `  return nearEnv.value === NearEnvironment.MainNet ? ${codegenName}_MAINNET : ${codegenName}_TESTNET;`,
        `}`,
        '',
        `export function use${contractName}Contract() {`,
        `  const contractId = use${contractName}ContractId();`,
        '',
        '  return (',
        `    useNearContract<I${contractName}Contract>(contractId, {`,
        `      viewMethods: [\n${viewMethods.join('\n')}\n      ],`,
        `      changeMethods: [\n${changeMethods.join('\n')}\n      ],`,
        '    }',
        '  ));',
        '}',
    ].join('\n');
}

function getCoreCodeDefault({ contractName }) {
    return `export function use${contractName}QueryRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: ${contractName}ViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = use${contractName}Contract();
  return useNearQuery(methodName, { contract, ...opts });
}
export function use${contractName}MutationRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: ${contractName}ChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = use${contractName}Contract();
  return useNearMutation(methodName, { contract, ...opts });
}`;
}

function getStartCodeDefault({ contractName }) {
    return [
        `import { useNearQuery, useNearMutation, useNearContract, useNearEnvironment, NearEnvironment } from "react-near";`,
        'import { NearQueryOptions } from "react-near/hooks/query";',
        'import { NearMutationOptions } from "react-near/hooks/mutation";',
    ].join('\n');
}

module.exports = {
    codegenNearReactTs
};
