import React from 'react';
import { NearContext } from '../NearProvider';
import { encodeRequest, NearClient } from '../core/client';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
   variables?: Req;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   skip?: boolean;
   debug?: boolean;
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

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
   contractId: string,
   methodName: string,
   opts: NearQueryOptions<Res, Req> = {},
) {
   const { client, account } = React.useContext(NearContext);

   const [state, setState] = React.useState<{
      data: Res | undefined;
      loading: boolean;
      error: Error | null | undefined;
   }>({
      loading: !opts.skip,
      data: undefined,
      error: null,
   });

   const callMethod = (args?: Req, useCache: boolean = true) => {
      const requestId = encodeRequest(methodName, args || opts.variables || {});
      const cacheState = client.cache.get(requestId, 'ROOT_QUERY') as Res | null;
      const isFetched = client.cache.get(requestId, 'ROOT_FETCHED') as boolean | null;

      if (useCache) {
         if (cacheState) {
            client.cache.set(requestId, cacheState, 'ROOT_QUERY');

            return Promise.resolve(cacheState) as Promise<Res>;
         }
         if (isFetched) {
            return Promise.resolve(undefined);
         }

         client.cache.set(
            requestId,
            { data: cacheState, loading: true, error: null },
            'ROOT_QUERY',
         );
      }

      return new Promise(async (resolve: (res: Res | undefined) => void, reject) => {
         try {
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

            const res = await account.viewFunction(contractId, methodName, args || opts.variables);

            if (opts.debug) {
               console.log(`NEAR #${contractId}-${methodName}`, { ...args }, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res,
                  variables: (args || opts.variables || {}) as any,
                  methodName,
                  requestId,
               });
            }

            if (opts.onCompleted) {
               opts.onCompleted(res);
            }

            client.cache.set(requestId, { data: res, loading: false, error: null }, 'ROOT_QUERY');
            client.cache.set(requestId, true, 'ROOT_FETCHED');
            // client.cache.set(requestId, false, 'ROOT_LOADING');

            return resolve(res);
         } catch (e) {
            if (opts.debug) {
               console.error(`NEAR #${contractId}-${methodName}`, { ...opts.variables }, e);
            }

            if (opts.onError) {
               opts.onError(e as Error);
            }

            client.cache.set(requestId, true, 'ROOT_FETCHED');
            client.cache.set(
               requestId,
               { data: undefined, loading: false, error: e },
               'ROOT_QUERY',
            );

            return reject(e);
         }
      });
   };

   React.useEffect(() => {
      if (!opts.skip) {
         const requestId = encodeRequest(methodName, opts.variables || {});

         const watcher = function (v: {
            data: any;
            loading: boolean;
            error: Error | null | undefined;
         }) {
            if (JSON.stringify(v) !== JSON.stringify(state)) {
               setState(v);
            }
         };

         const unWatch = client.cache.watch(requestId, watcher, 'ROOT_QUERY');

         return () => {
            unWatch();
         };
      }

      return () => {};
   }, [client, opts.variables, methodName, state, opts.skip]);

   React.useEffect(() => {
      if (!opts.skip) {
         callMethod()
            .then()
            .catch(() => {});
      }
   }, [methodName, opts.skip, opts.onError, opts.variables, account]);

   return {
      data: state.data === null ? undefined : state.data,
      loading: state.loading,
      error: state.error,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
