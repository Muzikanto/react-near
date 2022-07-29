import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { StorageMethods } from './methods';
import { StorageBalance } from './types';

export type StorageWithdrawArgs = {
   amount?: string;
};
export type StorageWithdrawResult = StorageBalance;

function useStorageWithdraw<
   Res = StorageWithdrawResult,
   Req extends StorageWithdrawArgs = StorageWithdrawArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(StorageMethods.storage_withdraw, opts);
}

export default useStorageWithdraw;
