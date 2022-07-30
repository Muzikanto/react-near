import { FtContract } from './types';
import useNearContract from '../../contract/useNearContract';
import { FT_METHODS } from './config';

function useNearFtContract(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<FtContract>(contractId, {
      viewMethods: [...FT_METHODS.viewMethods, ...(addMethods.viewMethods || [])],
      changeMethods: [...FT_METHODS.changeMethods, ...(addMethods.changeMethods || [])],
   });
}

export default useNearFtContract;
