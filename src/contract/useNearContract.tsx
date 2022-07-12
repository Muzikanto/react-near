import React from 'react';
import { Contract } from 'near-api-js';
import useNearWallet from '../core/wallet';
import { NearContext } from '../NearProvider';
import { encodeRequest } from '../core/client';

export type NearContract = Contract;

function useNearContract(
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): NearContract | undefined {
   const { client } = React.useContext(NearContext);

   const wallet = useNearWallet();

   const contract = React.useMemo(() => {
      if (wallet) {
         const walletAccount = wallet.account();
         const requestId = encodeRequest(contractId,  '_', {
            accountId: walletAccount.accountId,
            ...contractMethods,
         });
         const cacheState = client.cache.get(requestId, 'ROOT_CONTRACT');

         if (cacheState) {
            return cacheState as Contract;
         }

         const contr = new Contract(walletAccount, contractId, contractMethods);

         client.cache.set(requestId, contr, 'ROOT_CONTRACT');

         return contr;
      }

      return null;
   }, [wallet]);

   return wallet ? (contract as NearContract) : undefined;
}

export default useNearContract;
