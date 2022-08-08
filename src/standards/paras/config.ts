import { ParasMethods } from './methods';

export const PARAS_CONTRACT_ID_TESTNET = 'paras-marketplace-v1.testnet';
export const PARAS_CONTRACT_ID_MAINNET = 'marketplace.paras.near';
export const PARAS_STORAGE_DEPOSIT = '8590000000000000000000';

export const PARAS_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [ParasMethods.get_market_data],
   changeMethods: [],
};
