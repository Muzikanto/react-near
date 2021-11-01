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
   const [loading, setLoading] = React.useState<boolean>(false);

   const callMethod = (args?: Req, useCache: boolean = true) => {
      const requestId = client.encodeRequest(methodName, args || opts.variables || {});
      const cacheState = client.get(requestId, 'QUERY') as Res | null;
      const isFetched = client.get(requestId, 'FETCHED') as boolean | null;

      if ((contract as any)[methodName] && (useCache ? !cacheState : false)) {
         client.set(requestId, true, 'LOADING');
      }

      return new Promise(async (resolve: (res: Res | undefined) => void, reject) => {
         if (contract) {
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

            if (useCache) {
               if (cacheState) {
                  return resolve(cacheState as Res);
               }
               if (isFetched) {
                  return;
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
               client.set(requestId, false, 'LOADING');

               return resolve(res);
            } catch (e) {
               if (opts.debug) {
                  console.log(`NEAR #${methodName} Error!`, { ...opts.variables }, e);
               }

               if (opts.onError) {
                  opts.onError(e as Error);
               }

               client.set(requestId, false, 'LOADING');

               return reject(e);
            }
         }

         const err = new Error('Contract is not provided');

         if (opts.onError) {
            opts.onError(err);
         }
         if (opts.debug) {
            console.log(`NEAR #${methodName} Error!`, err);
         }

         return reject(err);
      });
   };

   React.useEffect(() => {
      if (contract && !opts.skip) {
         callMethod()
            .then()
            .catch(() => {});
      }
   }, [contract, methodName, opts.skip]);
   React.useEffect(() => {
      return client.subscribe(
         client.encodeRequest(methodName, opts.variables || {}),
         (v) => {
            if (JSON.stringify(v) !== JSON.stringify(state)) {
               setState(v);
            }
         },
         'QUERY',
      );
   }, [opts.variables, methodName, state]);
   React.useEffect(() => {
      return client.subscribe(
         client.encodeRequest(methodName, opts.variables || {}),
         (v) => {
            if (loading !== v) {
               setLoading(v);
            }
         },
         'LOADING',
      );
   }, [opts.variables, methodName, loading]);

   return {
      data: state,
      loading,
      refetch: (args?: Req) => callMethod(args, false),
   };
}

export default useNearQuery;
