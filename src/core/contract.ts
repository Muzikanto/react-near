import React from 'react';
import { Contract } from 'near-api-js';
import { NEAR_GAS } from '../config';
import useNearAccount from './account';
import useNearWallet from './wallet';
import { NearContext } from '../NearProvider';
import { encodeRequest } from './client';

export type NearContract = Contract & {
   funcCall: <Res = any, Req extends { [key: string]: any } = {}>(opts: {
      method: string;
      args?: Req;
      gas?: number;
      attachedDeposit?: string;
   }) => Promise<Res>;
};

function useNearContract(
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): NearContract | null {
   const { client } = React.useContext(NearContext);

   const account = useNearAccount();
   const wallet = useNearWallet();

   const contract = React.useMemo(() => {
      if (wallet) {
         const walletAccount = wallet.account();
         const requestId = encodeRequest(contractId, {
            accountId: walletAccount.accountId,
            ...contractMethods,
         });
         const cacheState = client.cache.get(requestId, 'ROOT_CONTRACT');

         if (cacheState) {
            return cacheState as Contract;
         }

         const contr = new Contract(walletAccount, contractId, contractMethods);

         (contr as any).funcCall = function (opts: {
            method: string;
            args?: any;
            gas?: number;
            attachedDeposit?: string;
         }) {
            if (account) {
               return account.functionCall(
                  contractId,
                  opts.method,
                  opts.args || {},
                  (opts.gas || NEAR_GAS).toString() as any,
                  opts.attachedDeposit,
               ) as any;
            }

            return Promise.reject('Account not connected');
         };

         client.cache.set(requestId, contr, 'ROOT_CONTRACT');

         return contr;
      }

      return null;
   }, [wallet]);

   return wallet ? (contract as NearContract) : null;
}

export default useNearContract;
