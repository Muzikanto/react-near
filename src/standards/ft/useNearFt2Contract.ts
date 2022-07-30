import { FtContract } from './types';
import useNearContract from '../../contract/useNearContract';
import { FT_METHODS } from './config';
import { StorageContract } from '../storage/types';
import { STORAGE_METHODS } from '../storage/config';

function useNearFt2Contract(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<FtContract & StorageContract>(contractId, {
      viewMethods: [
         ...FT_METHODS.viewMethods,
         ...STORAGE_METHODS.viewMethods,
         ...(addMethods.viewMethods || []),
      ],
      changeMethods: [
         ...FT_METHODS.changeMethods,
         ...STORAGE_METHODS.changeMethods,
         ...(addMethods.changeMethods || []),
      ],
   });
}

export default useNearFt2Contract;
