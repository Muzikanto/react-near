import { NearQueryOptions, useNearQuery } from '../hooks';
import { StorageBalance } from './useStorageDeposit';

export type StorageBalanceOfArgs = {
   account_id: string;
};

function useStorageBalanceOf<
   Res = StorageBalance,
   Req extends StorageBalanceOfArgs = StorageBalanceOfArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('storage_balance_od', opts);
}

export default useStorageBalanceOf;
