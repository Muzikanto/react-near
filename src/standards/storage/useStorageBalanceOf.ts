import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { StorageBalance } from './types';
import { StorageMethods } from './methods';

export type StorageBalanceOfArgs = {
   account_id: string;
};
export type StorageBalanceOfResult = StorageBalance;

function useStorageBalanceOf<
   Res = StorageBalanceOfResult,
   Req extends StorageBalanceOfArgs = StorageBalanceOfArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(StorageMethods.storage_balance_of, opts);
}

export default useStorageBalanceOf;
