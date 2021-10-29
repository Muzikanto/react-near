import { Contract } from 'near-api-js';
import React from 'react';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useNearAccount } from './index';
import {NEAR_GAS} from "../config";

export type NearMutationOptions<Res = any, Req extends { [key: string]: any } = any> = {
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   debug?: boolean;
   gas?: number;
};

function useNearMutation<Res = any, Req extends { [key: string]: any } = any>(
   contract: Contract | null,
   methodName: string,
   opts: NearMutationOptions<Res, Req> = {},
) {
   const account = useNearAccount();

   const [loading, setLoading] = React.useState<boolean>(false);
   const [data, setData] = React.useState<Res | null>(null);

   const callMethod = async (args: Req, attachedDeposit?: number) => {
      if (!contract) {
         if (opts.onError) {
            opts.onError(new Error('Not found contract state'));
         }
         return Promise.reject('Not found contract state');
      }
      if (!account) {
         if (opts.onError) {
            opts.onError(new Error('Not found contract account'));
         }
         return Promise.reject('Not found contract account');
      }

      if (!(contract as any)[methodName]) {
         if (opts.onError) {
            opts.onError(new Error('Not found contract method'));
         }
         return Promise.reject('Not found contract method');
      }

      setLoading(true);

      try {
         let res: any;

         if (attachedDeposit || opts.gas) {
            res = await account.functionCall(
               contract.contractId,
               methodName,
               args,
               (opts.gas || NEAR_GAS) as any,
               (attachedDeposit ? parseNearAmount(attachedDeposit.toString()) : undefined) as any,
            );
         } else {
            // @ts-ignore
            res = await contract[methodName](args);
         }

         if (opts.debug) {
            console.log(`#${methodName}`, res);
         }

         setData(res);

         if (opts.onCompleted) {
            opts.onCompleted(res);
         }

         setLoading(false);
         return res;
      } catch (e) {
         setLoading(false);

         if (opts.onError) {
            opts.onError(e as Error);
         }

         throw e;
      }
   };

   return [callMethod, { loading, data }] as const;
}

export default useNearMutation;
