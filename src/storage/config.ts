const DEFAULT_STORAGE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: ['storage_balance_of', 'storage_balance_bounds'],
   changeMethods: ['storage_deposit', 'storage_withdraw', 'storage_unregister'],
};

export { DEFAULT_STORAGE_METHODS };
