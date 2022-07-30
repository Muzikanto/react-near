import React from 'react';
import { Contract } from 'near-api-js';
import useNearWallet from '../core/wallet';
import { NearContext } from '../NearProvider';
import { encodeRequest } from '../core/client';

export type NearContract<T extends { [key: string]: any } = {}> = Contract & T;

function useNearContract<T extends { [key: string]: any } = {}>(
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): NearContract<T> | undefined {
   const { client } = React.useContext(NearContext);

   const wallet = useNearWallet();

   const contract = React.useMemo(() => {
      const requestId = encodeRequest(contractId);
      const cacheState = client.getContract(requestId);

      if (cacheState) {
         const isAvailableCache =
            typeof window === 'undefined' ? true : cacheState instanceof Contract;

         if (wallet && !isAvailableCache) {
            const walletAccount = wallet.account();
            const contract = new Contract(walletAccount, contractId, contractMethods);

            client.setContract(requestId, contract);
            client.set(requestId, true, 'ROOT_FETCHED');

            return contract;
         }

         return cacheState as Contract;
      }
      if (!wallet) {
         return undefined;
      }

      const walletAccount = wallet.account();
      const contract = new Contract(walletAccount, contractId, contractMethods);

      client.setContract(requestId, contract);
      client.set(requestId, true, 'ROOT_FETCHED');

      return contract;
   }, [wallet]);

   return (contract as NearContract<T> | undefined) || undefined;
}

export default useNearContract;
