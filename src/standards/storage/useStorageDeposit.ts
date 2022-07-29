import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { StorageBalance } from './types';
import { StorageMethods } from './methods';

export type StorageDepositArgs = {
   account_id?: string;
   registration_only?: boolean;
};
export type StorageDepositResult = StorageBalance;

function useStorageDeposit<
   Res = StorageDepositResult,
   Req extends StorageDepositArgs = StorageDepositArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(StorageMethods.storage_deposit, opts);
}

export default useStorageDeposit;
