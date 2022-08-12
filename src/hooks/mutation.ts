import React from 'react';
import { encodeRequest, NearClient } from '../core/client';
import { NearContext } from '../NearProvider';
import { NearContract } from '../contract/useNearContract';
import useNearContractProvided from '../contract/useNearContractProvided';
import { createNearTransaction } from '../core/user';
import * as nearApi from 'near-api-js';

export type NearMutationOptions<Res = any, Req extends { [key: string]: any } = any> = {
   contract?: string | NearContract;
   mock?: (args: Req, attachedDeposit?: string, gas?: number) => Promise<Res>;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   debug?: boolean;
   gas?: number;
   skipRenders?: boolean;
   callbackUrl?: string;
   meta?: string;
   update?: (
      client: NearClient,
      res: {
         data: Res;
         variables: Req;
         attachedDeposit?: string;
         methodName: string;
         requestId: string;
      },
   ) => void;
};

function useNearMutation<Res = any, Req extends { [key: string]: any } = any>(
   methodName: string,
   opts: NearMutationOptions<Res, Req>,
) {
   const { client, account, near, wallet } = React.useContext(NearContext);
   const contractProvided = useNearContractProvided();
   const contractV = opts.contract || contractProvided;
   const contractId = React.useMemo(() => {
      return contractV ? (typeof contractV === 'string' ? contractV : contractV.contractId) : '_';
   }, [contractV]);

   const [state, setState] = React.useState<{ data: Res | undefined; loading: boolean }>({
      loading: false,
      data: undefined,
   });

   const callMethod = async (args: Req, attachedDeposit?: string, gas?: number): Promise<Res> => {
      const requestId = encodeRequest(contractId, methodName, args);

      client.set(requestId, { data: null, loading: true, error: null }, 'ROOT_MUTATION');

      if (account && !opts.skipRenders) {
         setState({ data: undefined, loading: true });
      }

      return new Promise(async (resolve: (res: Res) => void, reject) => {
         const contractV =
            (typeof opts.contract === 'object' ? opts.contract.contractId : opts.contract) ||
            (contractProvided && contractProvided.contractId);

         try {
            let res: any;

            if (opts.mock) {
               res = await opts.mock(args, attachedDeposit, gas);
            } else {
               if (!account) {
                  const err = new Error('Not found near account');

                  if (opts.debug) {
                     console.error(`NEAR #${contractV}-${methodName}`, err);
                  }
                  if (opts.onError) {
                     opts.onError(err);
                  }

                  return reject(err);
               }
               if (!contractV) {
                  const err = new Error('Not found contract');

                  if (opts.debug) {
                     console.error(`NEAR #${contractV}-${methodName}`, err);
                  }
                  if (opts.onError) {
                     opts.onError(err);
                  }

                  return reject(err);
               }

               res = await account.functionCall({
                  contractId: contractV,
                  methodName,
                  attachedDeposit,
                  gas: gas || opts.gas,
                  args,
                  walletCallbackUrl: opts.callbackUrl,
                  walletMeta: opts.meta,
               });
            }

            if (opts.debug) {
               console.log(`NEAR #${contractV}-${methodName}`, { ...args }, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res,
                  variables: args,
                  attachedDeposit,
                  methodName,
                  requestId: encodeRequest(contractId, methodName, args),
               });
            }

            if (opts.onCompleted) {
               opts.onCompleted(res);
            }

            if (!opts.skipRenders) {
               setState({ data: res, loading: false });
            }

            client.set(requestId, { data: res, loading: false, error: null }, 'ROOT_MUTATION');

            return resolve(res);
         } catch (e) {
            if (opts.debug) {
               console.error(`NEAR #${contractV}-${methodName}`, { ...args }, e);
            }

            if (opts.onError) {
               opts.onError(e as Error);
            }

            if (!opts.skipRenders) {
               setState({ data: undefined, loading: false });
            }

            client.set(requestId, { data: null, loading: false, error: e }, 'ROOT_MUTATION');

            return reject(e);
         }
      });
   };
   const createTransaction = React.useCallback(
      (
         args: Req,
         attachedDeposit?: string,
         gas?: number,
         nonceOffset: number = 1,
      ): Promise<nearApi.transactions.Transaction> => {
         if (!near || !wallet) {
            throw new Error('Not found near ctx');
         }
         if (!account) {
            throw new Error('Near account does not connected');
         }

         return createNearTransaction(
            near,
            wallet,
            account.accountId,
            contractId,
            [nearApi.transactions.functionCall(methodName, args, gas || opts.gas, attachedDeposit)],
            nonceOffset,
         );
      },
      [near, wallet, account, contractId, opts.gas],
   );

   return [
      callMethod,
      {
         data: state.data === null ? undefined : state.data,
         loading: state.loading,
         createTransaction,
      },
   ] as const;
}

export default useNearMutation;
