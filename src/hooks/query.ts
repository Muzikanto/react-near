import { Contract } from 'near-api-js';
import React from 'react';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
   variables?: Req;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   skip?: boolean;
   debug?: boolean;
};

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
   contract: Contract,
   methodName: string,
   opts: NearQueryOptions<Res, Req> = {},
) {
   const [loading, setLoading] = React.useState<boolean>(false);
   const [data, setData] = React.useState<Res | null>(null);

   const callMethod = async (args?: Req) => {
      if (contract) {
         if (!(contract as any)[methodName]) {
            if (opts.onError) {
               opts.onError(new Error('Not found contract method'));
            }
            return Promise.reject('Not found contract method');
         }

         setLoading(true);

         try {
            // @ts-ignore
            const res = await contract[methodName](args || opts.variables);

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
      }

      if (opts.onError) {
         opts.onError(new Error('Not found contract state'));
      }
      return Promise.reject('Not found contract state');
   };

   React.useEffect(() => {
      if (contract && !opts.skip) {
         callMethod().then().catch();
      }
   }, [contract, opts.skip]);

   return { loading, data, refetch: callMethod };
}

export default useNearQuery;
