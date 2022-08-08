import useNearContract from '../../contract/useNearContract';
import { RefFinancePoolContract } from './types';
import { DEFAULT_REF_FINANCE_POOL_METHODS } from './config';

function useRefFinancePool(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<RefFinancePoolContract>(contractId, {
      viewMethods: [
         ...DEFAULT_REF_FINANCE_POOL_METHODS.viewMethods,
         ...(addMethods.viewMethods || []),
      ],
      changeMethods: [
         ...DEFAULT_REF_FINANCE_POOL_METHODS.changeMethods,
         ...(addMethods.changeMethods || []),
      ],
   });
}

export default useRefFinancePool;
