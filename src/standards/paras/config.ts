import { ParasMethods } from './methods';

export const PARAS_CONTRACT_ID_TESTNET = 'paras-marketplace-v1.testnet';
export const PARAS_CONTRACT_ID_MAINNET = 'marketplace.paras.near';
export const PARAS_STORAGE_DEPOSIT_IN_YOCTO = 8_590_000_000_000_000_000_000; // 0.00859 NEAR

export const PARAS_API_TESTNET_URL = 'https://api-v3-marketplace-develop.paras.id';
export const PARAS_API_MAINNET_URL = 'https://api-v2-mainnet.paras.id';

export const PARAS_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [ParasMethods.get_market_data],
   changeMethods: [],
};
