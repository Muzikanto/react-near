import { MtCoreMethods } from './methods';

const MT_CORE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [MtCoreMethods.mt_balance_of, MtCoreMethods.mt_total_supply],
   changeMethods: [MtCoreMethods.mt_batch_transfer_call, MtCoreMethods.mt_batch_transfer],
};

export { MT_CORE_METHODS };
