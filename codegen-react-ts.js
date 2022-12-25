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
        `export function use${functionName}${isView ? 'Query' : 'Mutation'}(opts: Omit<Near${
            isView ? 'Query' : 'Mutation'
        }Options<${resultInterface}, ${argsInterface}>, 'contract'>) {`,
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
        `  const nearEnv = useNearEnv();`,
        '',
        `  return nearEnv.value === NearEnvironment.MainNet ? ${codegenName}_MAINNET : ${codegenName}_TESTNET;`,
        `}`,
        '',
    ].join('\n');
}

function getCoreCodeDefault({ contractName }) {
    return `export function use${contractName}QueryRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: ${contractName}ViewMethods,
  opts: Omit<NearQueryOptions<Res, Req>, 'contract'> = {}
) {
  const contract = use${contractName}ContractId();
  return useNearQuery(methodName, { contract, ...opts });
}
export function use${contractName}MutationRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: ${contractName}ChangeMethods,
  opts: Omit<NearMutationOptions<Res, Req>, 'contract'> = {}
) {
  const contract = use${contractName}ContractId();
  return useNearMutation(methodName, { contract, ...opts });
}`;
}

function getStartCodeDefault({ contractName }) {
    return [
        `import { useNearQuery, useNearMutation, useNearEnv, NearEnvironment } from "react-near";`,
        'import { NearQueryOptions } from "react-near/hooks/query";',
        'import { NearMutationOptions } from "react-near/hooks/mutation";',
    ].join('\n');
}

module.exports = {
    codegenNearReactTs
};
