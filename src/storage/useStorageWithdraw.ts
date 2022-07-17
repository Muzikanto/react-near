import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';
import {StorageBalance} from "./useStorageDeposit";

export type StorageWithdrawArgs = {
   amount?: string;
};

function useStorageWithdraw<
   Res = StorageBalance,
   Req extends StorageWithdrawArgs = StorageWithdrawArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>('storage_withdraw', opts);
}

export default useStorageWithdraw;
