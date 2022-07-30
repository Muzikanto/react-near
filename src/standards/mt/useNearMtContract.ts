import { MtContract } from './types';
import useNearContract from '../../contract/useNearContract';
import { MT_METHODS } from './config';

function useNearMtContract(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<MtContract>(contractId, {
      viewMethods: [...MT_METHODS.viewMethods, ...(addMethods.viewMethods || [])],
      changeMethods: [...MT_METHODS.changeMethods, ...(addMethods.changeMethods || [])],
   });
}

export default useNearMtContract;
