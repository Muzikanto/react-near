import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { StorageBalanceBounds } from './types';
import { StorageMethods } from './methods';

export type StorageBalanceBoundsArgs = {};
export type StorageBalanceBoundsResult = StorageBalanceBounds;

function useStorageBalanceBounds<
   Res = StorageBalanceBoundsResult,
   Req extends StorageBalanceBoundsArgs = StorageBalanceBoundsArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(StorageMethods.storage_balance_bounds, opts);
}

export default useStorageBalanceBounds;
