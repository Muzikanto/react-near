import React from 'react';
import { Contract, utils } from 'near-api-js';
import { NEAR_GAS } from '../config';
import useNearAccount from './account';
import useNearWallet from './wallet';
import nearClient from './client';

export type NearContract = Contract & {
  funcCall: <Res = any, Req extends { [key: string]: any } = {}>(
    methodName: string,
    args: Req,
    attachedDeposit: number
  ) => Promise<Res>;
};

function useNearContract(
  contractId: string,
  contractMethods: { viewMethods: string[]; changeMethods: string[] }
): NearContract | null {
  const account = useNearAccount();
  const wallet = useNearWallet();
  const contract = React.useMemo(() => {
    if (wallet) {
      const walletAccount = wallet.account();
      const requestId = nearClient.encodeRequest(contractId, {
        accountId: walletAccount.accountId,
        ...contractMethods,
      });
      const cacheState = nearClient.get(requestId, 'CONTRACT');

      if (cacheState) {
        return cacheState as Contract;
      }

      const contr = new Contract(walletAccount, contractId, contractMethods);

      (contr as any).funcCall = function(
        methodName: string,
        args: { [key: string]: any } = {},
        attachedDeposit?: number
      ) {
        if (account) {
          return account.functionCall(
            contractId,
            methodName,
            args,
            NEAR_GAS as any,
            attachedDeposit ? (utils.format.parseNearAmount(attachedDeposit.toString()) as any) : undefined
          ) as any;
        }

        return Promise.reject('Account not connected');
      };

      nearClient.set(requestId, contr, 'CONTRACT');

      return contr;
    }

    return null;
  }, [wallet]);

  return wallet ? (contract as NearContract) : null;
}

export default useNearContract;
