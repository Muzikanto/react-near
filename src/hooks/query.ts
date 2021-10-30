import React from 'react';
import { NearContext } from '../NearProvider';
import useNearContractProvided from '../core/contract-provided';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
   variables?: Req;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   skip?: boolean;
   debug?: boolean;
};

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
   methodName: string,
   opts: NearQueryOptions<Res, Req> = {},
) {
   const { client } = React.useContext(NearContext);
   const contract = useNearContractProvided();

   const [state, setState] = React.useState<Res | undefined>(undefined);

   const callMethod = async (args?: Req, useCache: boolean = true) => {
      if (contract) {
         if (!(contract as any)[methodName]) {
            const err = new Error('Not found contract method');

            if (opts.onError) {
               opts.onError(err);
            }
            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, err);
            }
            return Promise.reject(err);
         }

         const requestId = client.encodeRequest(methodName, args || opts.variables || {});
         const cacheState = client.get(requestId, 'QUERY') as Res | null;
         const isFetched = client.get(requestId, 'FETCHED') as boolean | null;

         if (useCache) {
            if (cacheState) {
               if (JSON.stringify(state) !== JSON.stringify(cacheState)) {
                  setState(cacheState);
               }

               return cacheState as Res;
            }
            if (isFetched) {
               return Promise.reject();
            }
         }

         try {
            // @ts-ignore
            const res = await contract[methodName](args || opts.variables);

            if (opts.debug) {
               console.log(`NEAR #${methodName}`, res);
            }

            if (opts.onCompleted) {
               opts.onCompleted(res);
            }

            client.set(requestId, res, 'QUERY');
            client.set(requestId, true, 'FETCHED');

            setState(res);
            return res;
         } catch (e) {
            if (opts.debug) {
               console.log(`NEAR #${methodName} Error!`, e);
            }

            if (opts.onError) {
               opts.onError(e as Error);
            }

            throw e;
         }
      }

      const err = new Error('Contract is not provided');

      if (opts.onError) {
         opts.onError(err);
      }
      if (opts.debug) {
         console.log(`NEAR #${methodName} Error!`, err);
      }

      return Promise.reject(err);
   };

   React.useEffect(() => {
      if (contract && !opts.skip) {
         callMethod().then().catch();
      }
   }, [contract, methodName, opts.skip]);

   return {
      data: state,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
