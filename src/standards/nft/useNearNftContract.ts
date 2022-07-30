import { NftContract } from './types';
import useNearContract from '../../contract/useNearContract';
import { NFT_METHODS } from './config';

function useNearNftContract(
   contractId: string,
   addMethods: { viewMethods?: string[]; changeMethods?: string[] } = {},
) {
   return useNearContract<NftContract>(contractId, {
      viewMethods: [...NFT_METHODS.viewMethods, ...(addMethods.viewMethods || [])],
      changeMethods: [...NFT_METHODS.changeMethods, ...(addMethods.changeMethods || [])],
   });
}

export default useNearNftContract;
