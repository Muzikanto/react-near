import { NearQueryOptions, useNearQuery } from '../hooks';

export type StorageBalanceBoundsArgs = {};
export type StorageBalanceBounds = {
   min: string;
   max?: string;
};

function useStorageBalanceBounds<
   Res = StorageBalanceBounds,
   Req extends StorageBalanceBoundsArgs = StorageBalanceBoundsArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('storage_balance_bounds', opts);
}

export default useStorageBalanceBounds;
