import { StorageMethods } from './methods';

const STORAGE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [StorageMethods.storage_balance_of, StorageMethods.storage_balance_bounds],
   changeMethods: [
      StorageMethods.storage_deposit,
      StorageMethods.storage_withdraw,
      StorageMethods.storage_unregister,
   ],
};

export { STORAGE_METHODS };
