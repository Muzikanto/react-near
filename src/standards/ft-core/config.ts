import { FtCoreMethods } from './methods';

const FT_CORE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [FtCoreMethods.ft_metadata, FtCoreMethods.ft_balance_of, FtCoreMethods.ft_total_supply],
   changeMethods: [FtCoreMethods.ft_transfer_call, FtCoreMethods.ft_transfer],
};

export { FT_CORE_METHODS };
