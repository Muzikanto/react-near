import React from 'react';
import { Contract, utils } from 'near-api-js';
import { NEAR_GAS } from '../config';
import useNearAccount from './account';
import useNearWallet from './wallet';

export type NearContract = Contract & {
   funcCall: <Res = any, Req extends { [key: string]: any } = {}>(
      methodName: string,
      args: Req,
      attachedDeposit: number,
   ) => Promise<Res>;
};

function useNearContract(
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): NearContract | null {
   const account = useNearAccount();
   const wallet = useNearWallet();
   const contract = React.useMemo(
      () => (wallet ? new Contract(wallet.account(), contractId, contractMethods) : null),
      [wallet],
   );

   if (contract) {
      // @ts-ignore
      contract.funcCall = function (
         methodName: string,
         args: { [key: string]: any } = {},
         attachedDeposit?: number,
      ) {
         if (account) {
            return account.functionCall(
               contractId,
               methodName,
               args,
               NEAR_GAS,
               attachedDeposit
                  ? (utils.format.parseNearAmount(attachedDeposit.toString()) as any)
                  : undefined,
            ) as any;
         }

         return Promise.reject('Account not connected');
      };
   }

   return wallet ? (contract as NearContract) : null;
}

export default useNearContract;
