import useNearContract from '../../contract/useNearContract';
import { ParasContract } from './types';
import { PARAS_METHODS } from './config';

function useParasContract(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<ParasContract>(contractId, {
      viewMethods: [...PARAS_METHODS.viewMethods, ...(addMethods.viewMethods || [])],
      changeMethods: [...PARAS_METHODS.changeMethods, ...(addMethods.changeMethods || [])],
   });
}

export default useParasContract;
