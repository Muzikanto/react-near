import React from 'react';
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
   contractId: string,
   methodName: string,
   opts: NearMutationOptions<Res, Req> = {},
) {
   const { client, account } = React.useContext(NearContext);

   const [state, setState] = React.useState<{ data: Res | undefined; loading: boolean }>({
      loading: false,
      data: undefined,
   });

   const callMethod = async (args: Req, attachedDeposit?: string): Promise<Res> => {
      if (account && !opts.skipRenders) {
         setState({ data: undefined, loading: true });
      }

      return new Promise(async (resolve: (res: Res) => void, reject) => {
         if (!account) {
            const err = new Error('Not found contract account');

            if (opts.debug) {
               console.error(`NEAR #${contractId}-${methodName}`, err);
            }
            if (opts.onError) {
               opts.onError(err);
            }

            return reject(err);
         }

         try {
            let res: any;

            res = await account.functionCall({
               contractId,
               methodName,
               attachedDeposit,
               gas: opts.gas,
               args,
            });

            if (opts.debug) {
               console.log(`NEAR #${contractId}-${methodName}`, { ...args }, res);
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
               console.error(`NEAR #${contractId}-${methodName}`, { ...args }, e);
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
