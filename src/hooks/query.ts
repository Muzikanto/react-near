import React from 'react';
import nearClient from '../core/client';
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
   const contract = useNearContractProvided();

   const [state, setState] = React.useState<{ loading: boolean; data: Res | undefined }>({
      loading: false,
      data: undefined,
   });

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

         const requestId = nearClient.encodeRequest(methodName, args || opts.variables || {});
         const cacheState = nearClient.get(requestId, 'QUERY') as Res | null;
         const isFetched = nearClient.get(requestId, 'FETCHED') as boolean | null;

         if (useCache) {
            if (cacheState) {
               if (JSON.stringify(state.data) !== JSON.stringify(cacheState)) {
                  setState({ data: cacheState, loading: false });
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

            nearClient.set(requestId, res, 'QUERY');
            nearClient.set(requestId, true, 'FETCHED');

            setState({ data: res, loading: false });
            return res;
         } catch (e) {
            setState({ ...state, loading: false });

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
         setState({ ...state, loading: true });

         callMethod().then().catch();
      }
   }, [contract, methodName, opts.skip]);

   return {
      loading: state.loading,
      data: state.data,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
