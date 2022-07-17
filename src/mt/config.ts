import { DEFAULT_STORAGE_METHODS } from '../storage/config';

const DEFAULT_MT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: ['mt_balance_of', 'mt_total_supply'],
   changeMethods: ['mt_batch_transfer_call', 'mt_batch_transfer'],
};

const STANDARD_MT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [...DEFAULT_MT_METHODS.viewMethods, ...DEFAULT_STORAGE_METHODS.viewMethods],
   changeMethods: [...DEFAULT_MT_METHODS.changeMethods, ...DEFAULT_STORAGE_METHODS.changeMethods],
};

export { DEFAULT_MT_METHODS, STANDARD_MT_METHODS };
