import React from 'react';
import { encodeRequest, NearClient } from '../core/client';
import { useNear } from '..';
import { NEAR_GAS } from '..';
import { Optional } from '@near-wallet-selector/core/lib/utils.types';
import { Transaction } from '@near-wallet-selector/core/lib/wallet/transactions.types';

export type NearMutationOverrideOpts = {
   gas?: number;
   contractId?: string;
};
export type NearMutationOptions<Res = any, Req extends { [key: string]: any } = any> = {
   contract?: string;
   mock?: (
      args: Req,
      attachedDeposit?: string,
      overrideOpts?: NearMutationOverrideOpts,
   ) => Promise<Res>;
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
   const { client, selector, accountId } = useNear();

   const [state, setState] = React.useState<{ data: Res | undefined; loading: boolean }>({
      loading: false,
      data: undefined,
   });

   const callMethod = async (
      args: Req,
      attachedDeposit?: string,
      overrideOpts: NearMutationOverrideOpts = {},
   ): Promise<Res> => {
      let contractId = overrideOpts.contractId || opts.contract;

      if (!contractId) {
         console.error('Require contract id');
         return Promise.reject('Require contract id');
      }

      const requestId = encodeRequest(contractId, methodName, args);

      client.set(requestId, { data: null, loading: true, error: null }, 'ROOT_MUTATION');

      if (accountId && !opts.skipRenders) {
         setState({ data: undefined, loading: true });
      }

      return new Promise(async (resolve: (res: Res) => void, reject) => {
         try {
            if (!selector) {
               throw new Error('No wallet selector instance');
            }
            const wallet = await selector.wallet();

            let res: any;

            if (opts.mock) {
               res = await opts.mock(args, attachedDeposit, overrideOpts);
            } else {
               if (!accountId) {
                  const err = new Error('Not found near account');

                  if (opts.debug) {
                     console.error(`NEAR #${contractId}-${methodName}`, err);
                  }
                  if (opts.onError) {
                     opts.onError(err);
                  }

                  return reject(err);
               }

               res = wallet.signAndSendTransaction({
                  signerId: accountId!,
                  receiverId: contractId,
                  actions: [
                     {
                        type: 'FunctionCall',
                        params: {
                           methodName,
                           args,
                           gas: (overrideOpts.gas || opts.gas || NEAR_GAS).toString(),
                           deposit: attachedDeposit as string,
                        },
                     },
                  ],
               });
            }

            if (opts.debug) {
               console.log(`NEAR #${contractId}-${methodName}`, { ...args }, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res,
                  variables: args,
                  attachedDeposit: attachedDeposit,
                  methodName,
                  requestId: encodeRequest(contractId as string, methodName, args),
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
               console.error(`NEAR #${contractId}-${methodName}`, { ...args }, e);
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
         overrideOpts: {
            gas?: number;
            nonceOffset?: number;
            contractId?: string;
         } = {},
      ): Optional<Transaction, 'signerId'> => {
         return {
            signerId: accountId as string,
            receiverId: (overrideOpts.contractId || opts.contract) as string,
            actions: [
               {
                  type: 'FunctionCall',
                  params: {
                     methodName: methodName,
                     args: args,
                     gas: (overrideOpts.gas || opts.gas || NEAR_GAS).toString(),
                     deposit: attachedDeposit || '0',
                  },
               },
            ],
         };
      },
      [opts.contract, opts.gas],
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
