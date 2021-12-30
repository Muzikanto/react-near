import React from 'react';
import { useNearAccount } from './index';
import useNearContractProvided from '../core/contract-provided';
import { encodeRequest, NearClient } from '../core/client';
import { NearContext } from '../NearProvider';

export type NearMutationOptions<Res = any, Req extends { [key: string]: any } = any> = {
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   debug?: boolean;
   gas?: number;
   skipRenders?: boolean;
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
   opts: NearMutationOptions<Res, Req> = {},
) {
   const { client } = React.useContext(NearContext);
   const contract = useNearContractProvided();
   const account = useNearAccount();

   const [state, setState] = React.useState<{ data: Res | undefined; loading: boolean }>({
      loading: false,
      data: undefined,
   });

   const callMethod = async (args: Req, attachedDeposit?: string): Promise<Res> => {
      if (account && contract && (contract as any)[methodName] && !opts.skipRenders) {
         setState({ data: undefined, loading: true });
      }

      return new Promise(async (resolve: (res: Res) => void, reject) => {
         if (!account) {
            const err = new Error('Not found contract account');

            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, err);
            }
            if (opts.onError) {
               opts.onError(err);
            }

            return reject(err);
         }

         if (!contract) {
            const err = new Error('Not found contract state');

            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, err);
            }
            if (opts.onError) {
               opts.onError(err);
            }

            return reject(err);
         }

         if (!(contract as any)[methodName]) {
            const err = new Error('Not found contract method');

            if (opts.onError) {
               opts.onError(err);
            }
            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, err);
            }

            return reject(err);
         }

         try {
            let res: any;

            if (attachedDeposit || opts.gas) {
               res = await contract.funcCall({
                  method: methodName,
                  attachedDeposit,
                  gas: opts.gas,
                  args,
               });
            } else {
               // @ts-ignore
               res = await contract[methodName](args);
            }

            if (opts.debug) {
               console.log(`NEAR #${methodName}`, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res,
                  variables: args,
                  attachedDeposit,
                  methodName,
                  requestId: encodeRequest(methodName, args),
               });
            }

            if (opts.onCompleted) {
               opts.onCompleted(res);
            }

            if (!opts.skipRenders) {
               setState({ data: res, loading: false });
            }

            return resolve(res);
         } catch (e) {
            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, e);
            }

            if (opts.onError) {
               opts.onError(e as Error);
            }

            if (!opts.skipRenders) {
               setState({ data: undefined, loading: false });
            }

            return reject(e);
         }
      });
   };

   return [
      callMethod,
      { data: state.data === null ? undefined : state.data, loading: state.loading },
   ] as const;
}

export default useNearMutation;
