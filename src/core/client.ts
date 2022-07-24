import { Contract } from 'near-api-js';
import { NearQueryState } from '../hooks/query';

export function encodeRequest(
   contractId: string,
   methodName: string = '',
   args: { [key: string]: any } = {},
) {
   return `${contractId}.${methodName}(${JSON.stringify(args)})`;
}

export class NearClient {
   protected watchers: {
      [key: string]: {
         [key: string]: Array<(v: any) => void>;
      };
   } = {};

   public cache: { [key: string]: any } = {};

   constructor(fromClient?: NearClient) {
      if (fromClient) {
         this.from(fromClient);
      }
   }

   public set = <T>(key: string, value: T, rootId: string = 'ROOT') => {
      const { watchers, cache } = this;

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

   public setContract = (requestId: string, contract: Contract) => {
      this.set(requestId, contract, 'ROOT_CONTRACT');
   };

   public get = <T>(key: string, rootId: string = 'ROOT'): T | null => {
      const { cache } = this;

      if (rootId) {
         return (cache[rootId] || {})[key];
      } else {
         return cache[key];
      }
   };
   public getContract = (requestId: string): Contract | null => {
      return this.get<Contract | null>(requestId, 'ROOT_CONTRACT');
   };

   public watch = (key: string, watcher: (v: any) => void, rootId: string = 'ROOT') => {
      const { watchers } = this;

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

   public setQuery = <R>(key: string, data: NearQueryState<R>) => {
      this.set(key, data, 'ROOT_QUERY');
   };
   public getQuery = <R>(requestId: string): NearQueryState<R> | null => {
      return this.get<NearQueryState<R>>(requestId, 'ROOT_QUERY');
   };

   public from(fromClient: NearClient): NearClient {
      this.cache = {
         ROOT_QUERY: fromClient.cache.ROOT_QUERY,
         ROOT_CONTRACT: fromClient.cache.ROOT_CONTRACT,
      };

      return this;
   }

   public exists(key: string): boolean {
      return key in this.cache;
   }
}

const createNearClient = (fromClient?: NearClient): NearClient => {
   const client = new NearClient(fromClient);

   if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__NEAR_CLIENT__ = client;
   }

   return client;
};

export default createNearClient;
