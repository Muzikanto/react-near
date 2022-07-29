import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { StorageMethods } from './methods';

export type StorageUnregisterArgs = {
   force?: boolean;
};
export type StorageUnregisterResult = boolean;

function useStorageUnregister<
   Res = StorageUnregisterResult,
   Req extends StorageUnregisterArgs = StorageUnregisterArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(StorageMethods.storage_unregister, opts);
}

export default useStorageUnregister;
