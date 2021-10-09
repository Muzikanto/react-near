const GAS = '200000000000000';

function getNearConfig(env: string) {
   const s: {
      networkId: string;
      contractName: string;
      walletUrl: string;
      helperUrl: string;
      nodeUrl: string;
      GAS: string;
   } = {
      GAS,
      contractName: '',
      networkId: '',
      helperUrl: '',
      nodeUrl: '',
      walletUrl: '',
   };

   switch (env) {
      case 'production':
      case 'mainnet':
         Object.assign(s, {
            networkId: 'mainnet',
            nodeUrl: 'https://rpc.mainnet.near.org',
            walletUrl: 'https://wallet.near.org',
            helperUrl: 'https://helper.mainnet.near.org',
         });
         break;
      case 'development':
      case 'testnet':
         Object.assign(s, {
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
         });
         break;
      case 'betanet':
         Object.assign(s, {
            networkId: 'betanet',
            nodeUrl: 'https://rpc.betanet.near.org',
            walletUrl: 'https://wallet.betanet.near.org',
            helperUrl: 'https://helper.betanet.near.org',
         });
         break;
      case 'local':
         Object.assign(s, {
            networkId: 'local',
            nodeUrl: 'http://localhost:3030',
            keyPath: `${process.env.HOME}/.near/validator_key.json`,
            walletUrl: 'http://localhost:4000/wallet',
         });
         break;
      case 'test':
      case 'ci':
         Object.assign(s, {
            networkId: 'shared-test',
            nodeUrl: 'https://rpc.ci-testnet.near.org',
            masterAccount: 'test.near',
         });
         break;
      case 'ci-betanet':
         Object.assign(s, {
            networkId: 'shared-test-staging',
            nodeUrl: 'https://rpc.ci-betanet.near.org',
            masterAccount: 'test.near',
         });
         break;
      default:
         throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
   }

   return s;
}

export default getNearConfig;
