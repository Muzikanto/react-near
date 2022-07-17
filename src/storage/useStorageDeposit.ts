import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type StorageDepositArgs = {
   account_id?: string;
   registration_only?: boolean;
};
export type StorageBalance = {
   total: string;
   available: string;
};

function useStorageDeposit<Res = StorageBalance, Req extends StorageDepositArgs = StorageDepositArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('storage_deposit', opts);
}

export default useStorageDeposit;
