import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type StorageUnregisterArgs = {
   force?: boolean;
};

function useStorageUnregister<Res = boolean, Req extends StorageUnregisterArgs = StorageUnregisterArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('storage_unregister', opts);
}

export default useStorageUnregister;
