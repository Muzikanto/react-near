const codegenNearTs = {
    getMethod: () => '',
    getContract: getContractRaw,
    getStartCode: getStartCodeRaw,
    getCoreCode: () => '',
};

// override

function getContractRaw({ contractName, viewMethods, changeMethods, interfaceName, codegenName }) {
    return [
        `export function get${contractName}Contract(account: Account, contractId: string): Contract & ${interfaceName} {`,
        `  return new Contract(account, contractId, {`,
        `      viewMethods: [\n${viewMethods.join('\n')}\n      ],`,
        `      changeMethods: [\n${changeMethods.join('\n')}\n      ],`,
        `    }) as Contract & ${interfaceName};`,
        '}',
    ].join('\n');
}

function getStartCodeRaw({ contractName }) {
    return `import { Contract, Account } from "near-api-js";`;
}

module.exports = {
    codegenNearTs
};
