import { Contract } from 'near-api-js';
import { NearQueryState } from '../hooks/query';

export type NearClient = {
   cache: {
      data: { [key: string]: any };
      set: (key: string, value: any, rootId?: string) => void;
      get: (key: string, rootId?: string) => any;
      watch: (key: string, watcher: (v: any) => void, rootId?: string) => () => void;
      exists: (key: string) => boolean;

      setContract: (key: string, contract: Contract) => void;
      getContract: (key: string) => Contract | null;

      setQuery: <R>(key: string, data: NearQueryState<R>) => void;
      getQuery: <R>(key: string) => NearQueryState<R> | null;
   };
};

export function encodeRequest(
   contractId: string,
   methodName: string = '',
   args: { [key: string]: any } = {},
) {
   return `${contractId}.${methodName}(${JSON.stringify(args)})`;
}

// let nearClient: NearClient | null = null;

// export function getNearClient() {
//    return nearClient;
// }

const createNearClient = (fromClient?: NearClient): NearClient => {
   const watchers: {
      [key: string]: {
         [key: string]: Array<(v: any) => void>;
      };
   } = {};
   const cache: { [key: string]: any } = fromClient
      ? {
           ROOT_QUERY: fromClient.cache.data.ROOT_QUERY,
           ROOT_CONTRACT: fromClient.cache.data.ROOT_CONTRACT,
        }
      : {};

   const set = <T>(key: string, value: T, rootId: string = 'ROOT') => {
      if (rootId) {
         if (!cache[rootId]) {
            cache[rootId] = {};
         }

         cache[rootId][key] = value;
      } else {
         cache[key] = value;
      }

      if (watchers[rootId] && watchers[rootId][key]) {
         watchers[rootId][key].forEach((watcher) => watcher(value));
      }
   };
   const setContract = (requestId: string, contract: Contract) => {
      set(requestId, contract, 'ROOT_CONTRACT');
   };

   const get = <T>(key: string, rootId: string = 'ROOT'): T | null => {
      if (rootId) {
         return (cache[rootId] || {})[key];
      } else {
         return cache[key];
      }
   };
   const getContract = (requestId: string): Contract | null => {
      return get<Contract | null>(requestId, 'ROOT_CONTRACT');
   };

   const watch = (key: string, watcher: (v: any) => void, rootId: string = 'ROOT') => {
      if (!watchers[rootId]) {
         watchers[rootId] = {};
      }
      if (!watchers[rootId][key]) {
         watchers[rootId][key] = [];
      }

      watchers[rootId][key].push(watcher);

      return () => {
         watchers[rootId][key] = watchers[rootId][key].filter((el) => el !== watcher);
      };
   };

   const setQuery = <R>(key: string, data: NearQueryState<R>) => {
      set(key, data, 'ROOT_QUERY');
   };
   const getQuery = <R>(requestId: string): NearQueryState<R> | null => {
      return get<NearQueryState<R>>(requestId, 'ROOT_QUERY');
   };

   const client: NearClient & { watchers: any } = {
      cache: {
         data: cache,
         set,
         get,
         watch,
         setContract,
         getContract,
         setQuery,
         getQuery,
         exists: (k) => k in cache,
      },
      watchers,
   };

   // nearClient = client;

   if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__NEAR_CLIENT__ = client;
   }

   return client;
};

export default createNearClient;
