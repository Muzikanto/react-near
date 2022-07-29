import { RefFinanceGetPoolArgs, RefFinanceGetPoolResult } from './get_pool';
import { RefFinancePoolMethods } from './methods';

export type RefFinancePool = {
   amounts: [string, string];
   amp: number;
   pool_kind: string; // SIMPLE_POOL;
   shares_total_supply: string;
   token_account_ids: [string, string];
   total_fee: number;
};

export type RefFinancePoolContract = {
   [RefFinancePoolMethods.get_pool]: (
      args: RefFinanceGetPoolArgs,
   ) => Promise<RefFinanceGetPoolResult>;
};

export {};
