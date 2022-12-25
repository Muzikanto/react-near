import React from 'react';
import { encodeRequest, NearClient } from '../core/client';
import { CodeResult } from 'near-api-js/lib/providers/provider';
import useNear from './near';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
   contract: string;
   variables?: Req;
   mock?: (args: Req) => Promise<Res>;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   skip?: boolean;
   ssr?: boolean;
   debug?: boolean;
   poolInterval?: number;
   update?: (
      client: NearClient,
      res: {
         data: Res;
         variables: Req;
         attachedDeposit?: number;
         methodName: string;
         requestId: string;
      },
   ) => void;
};
export type NearQueryState<Res = any> = {
   data: Res | undefined;
   loading: boolean;
   error: Error | null | undefined;
};

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
   methodName: string,
   opts: NearQueryOptions<Res, Req>,
) {
   const { client, provider } = useNear();
   const [args, setArgs] = React.useState(opts.variables || {});

   React.useEffect(() => {
      if (JSON.stringify(args) !== JSON.stringify(opts.variables || {})) {
         setArgs(opts.variables || {});
      }
   }, [opts.variables]);

   const contractId = opts.contract;

   const requestId = React.useMemo(
      () => encodeRequest(contractId, methodName, args),
      [args, methodName, contractId],
   );

   const [state, setState] = React.useState<NearQueryState<Res>>(
      client.getQuery<Res>(requestId) || {
         loading: !opts.skip,
         data: undefined,
         error: null,
      },
   );

   const callMethod = (args?: Req, useCache: boolean = true) => {
      if (!provider) {
         return Promise.resolve(undefined);
      }

      const nextRequestId = encodeRequest(contractId, methodName, args || opts.variables || {});

      if (nextRequestId !== requestId) {
         setArgs(args || opts.variables || {});
      }

      const cacheState = client.getQuery<Res>(nextRequestId);
      const isFetched = client.get(nextRequestId, 'ROOT_FETCHED') as boolean | null;

      if (useCache) {
         if (cacheState) {
            client.setQuery(nextRequestId, cacheState);

            return Promise.resolve(cacheState.data) as Promise<Res>;
         }
         if (isFetched) {
            return Promise.resolve(undefined);
         }
      } else {
         client.setQuery(nextRequestId, {
            data: cacheState ? cacheState.data : undefined,
            loading: true,
            error: null,
         });
      }

      return new Promise(async (resolve: (res: Res | undefined) => void, reject) => {
         const variables = args || opts.variables || ({} as any);

         try {
            let res: Res | undefined = undefined;

            if (opts.mock) {
               res = await opts.mock(variables);
            } else {
               res = await provider
                  .query<CodeResult>({
                     request_type: 'call_function',
                     account_id: contractId,
                     method_name: methodName,
                     args_base64: btoa(JSON.stringify(variables)),
                     finality: 'optimistic',
                  })
                  .then((res) => JSON.parse(Buffer.from(res.result).toString()));
            }

            if (opts.debug) {
               console.log(`NEAR #${contractId}-${methodName}`, { ...args }, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res as any,
                  variables: (args || opts.variables || {}) as any,
                  methodName,
                  requestId: nextRequestId,
               });
            }

            if (opts.onCompleted) {
               opts.onCompleted(res as any);
            }

            client.setQuery(nextRequestId, { data: res, loading: false, error: null });
            client.set(nextRequestId, true, 'ROOT_FETCHED');
            // client.set(requestId, false, 'ROOT_LOADING');

            return resolve(res);
         } catch (e) {
            if (opts.debug) {
               console.error(`NEAR #${contractId}-${methodName}`, { ...opts.variables }, e);
            }

            if (opts.onError) {
               opts.onError(e as Error);
            }

            client.set(nextRequestId, true, 'ROOT_FETCHED');
            client.setQuery(nextRequestId, {
               data: undefined,
               loading: false,
               error: e as Error,
            });

            return reject(e);
         }
      });
   };

   // subscribe to changes
   React.useEffect(() => {
      const watcher = function (v: {
         data: any;
         loading: boolean;
         error: Error | null | undefined;
      }) {
         if (JSON.stringify(v) !== JSON.stringify(state)) {
            setState(v);
         }
      };

      const unWatch = client.watch(requestId, watcher, 'ROOT_QUERY');

      return () => {
         unWatch();
      };
   }, [client, opts.variables, opts.contract, methodName, state, contractId, requestId]);

   // first fetch
   React.useEffect(() => {
      const state = client.getQuery<Res>(requestId);

      if (state) {
         setState(state);
      }

      if (!opts.skip && (opts.ssr === false ? typeof window !== 'undefined' : true)) {
         callMethod()
            .then()
            .catch(() => {});
      }
   }, [methodName, opts.skip, opts.ssr, opts.onError, opts.variables, contractId, requestId]);
   // interval refetch
   React.useEffect(() => {
      if (typeof window !== 'undefined' && !opts.skip && opts.poolInterval) {
         const internal = setInterval(() => {
            callMethod()
               .then()
               .catch(() => {});
         }, opts.poolInterval);

         return () => {
            clearInterval(internal);
         };
      }

      return () => {};
   }, [methodName, opts.skip, opts.ssr, opts.onError, opts.variables, opts.contract]);

   if (typeof window === 'undefined') {
      if (opts.ssr && !opts.skip) {
         client.set(requestId, { contractId, methodName, args }, 'SSR');
      }
   }

   return {
      data: state.data === null ? undefined : state.data,
      loading: state.loading,
      error: state.error,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
