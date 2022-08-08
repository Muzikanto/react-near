import useNearContract from '../../contract/useNearContract';
import { ParasContract } from './types';
import { PARAS_CONTRACT_ID_MAINNET, PARAS_CONTRACT_ID_TESTNET, PARAS_METHODS } from './config';
import { useNearEnvironment } from '../../environment';
import { NearEnvironment } from '../../config';

function useParasContractFinally() {
   const nearEnv = useNearEnvironment();
   const contractId =
      nearEnv.value === NearEnvironment.TestNet
         ? PARAS_CONTRACT_ID_TESTNET
         : PARAS_CONTRACT_ID_MAINNET;

   return useNearContract<ParasContract>(contractId, PARAS_METHODS);
}

export default useParasContractFinally;
