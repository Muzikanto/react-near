import React from 'react';
import { NearContext } from '../NearProvider';
import { encodeRequest, NearClient } from '../core/client';
import { NearContract } from '../contract/useNearContract';
import useNearContractProvided from '../contract/useNearContractProvided';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
   contract?: string | NearContract;
   variables?: Req;
   onError?: (err: Error) => void;
   onCompleted?: (res: Res) => void;
   skip?: boolean;
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

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
   methodName: string,
   opts: NearQueryOptions<Res, Req>,
) {
   const { client, account } = React.useContext(NearContext);
   const contractProvided = useNearContractProvided();
   const contractV = opts.contract || contractProvided;
   const contractId = contractV
      ? typeof contractV === 'string'
         ? contractV
         : contractV.contractId
      : '_';

   const cacheState = client.cache.get(
      encodeRequest(contractId, methodName, opts.variables || {}),
      'ROOT_QUERY',
   );

   const [state, setState] = React.useState<{
      data: Res | undefined;
      loading: boolean;
      error: Error | null | undefined;
   }>({
      loading: !opts.skip,
      data: cacheState ? cacheState.data : undefined,
      error: null,
   });

   const callMethod = (args?: Req, useCache: boolean = true) => {
      const requestId = encodeRequest(contractId, methodName, args || opts.variables || {});
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
         const variables = args || opts.variables;

         try {
            let res: Res | undefined = undefined;

            if (account && typeof contractV === 'string') {
               res = await account.viewFunction(contractV, methodName, variables);
            }
            if (contractV && (contractV as any)[methodName]) {
               res = await (contractV as any)[methodName](variables);
            }

            if (
               !(account && typeof contractV === 'string') &&
               !(contractV && (contractV as any)[methodName])
            ) {
               const err = new Error('Not found account ctx or contract');

               if (opts.debug) {
                  console.error(`NEAR #${contractV}-${methodName}`, err);
               }
               if (opts.onError) {
                  opts.onError(err);
               }

               return reject(err);
            }

            if (opts.debug) {
               console.log(`NEAR #${contractV}-${methodName}`, { ...args }, res);
            }

            if (opts.update) {
               opts.update(client, {
                  data: res as any,
                  variables: (args || opts.variables || {}) as any,
                  methodName,
                  requestId,
               });
            }

            if (opts.onCompleted) {
               opts.onCompleted(res as any);
            }

            client.cache.set(requestId, { data: res, loading: false, error: null }, 'ROOT_QUERY');
            client.cache.set(requestId, true, 'ROOT_FETCHED');
            // client.cache.set(requestId, false, 'ROOT_LOADING');

            return resolve(res);
         } catch (e) {
            if (opts.debug) {
               console.error(`NEAR #${contractV}-${methodName}`, { ...opts.variables }, e);
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
         const requestId = encodeRequest(contractId, methodName, opts.variables || {});

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
   }, [client, opts.variables, methodName, state, opts.skip, contractV]);

   React.useEffect(() => {
      const requestId = encodeRequest(contractId, methodName, opts.variables || {});
      const state = client.cache.get(requestId, 'ROOT_QUERY');

      if (state) {
         setState(state);
      }

      if (!opts.skip && (account || contractV)) {
         callMethod()
            .then()
            .catch(() => {});
      }
   }, [methodName, opts.skip, opts.onError, opts.variables, account, contractV]);
   React.useEffect(() => {
      if (!opts.skip && opts.poolInterval && (account || contractV)) {
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
   }, [methodName, opts.skip, opts.onError, opts.variables, account, opts.contract]);

   return {
      data: state.data === null ? undefined : state.data,
      loading: state.loading,
      error: state.error,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
