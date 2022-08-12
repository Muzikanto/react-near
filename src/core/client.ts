import { Contract } from 'near-api-js';
import { NearQueryState } from '../hooks/query';
import { useNearContext } from '../NearProvider';

export function encodeRequest(
   contractId: string,
   methodName: string = '',
   args: { [key: string]: any } = {},
) {
   return `${contractId}.${methodName}(${JSON.stringify(args)})`;
}

class Observable {
   protected watchers: {
      [key: string]: {
         [key: string]: Array<(v: any) => void>;
      };
   } = {};
   public cache: { [key: string]: any } = {};

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
   public get = <T>(key: string, rootId: string = 'ROOT'): T | undefined => {
      const { cache } = this;

      if (rootId) {
         return (cache[rootId] || {})[key];
      } else {
         return cache[key];
      }
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

   public exists(key: string): boolean {
      return key in this.cache;
   }
}

export class NearClient extends Observable {
   constructor(fromClient?: NearClient) {
      super();

      if (fromClient) {
         this.from(fromClient);
      }
   }

   public setQuery = <R>(key: string, data: NearQueryState<R>) => {
      this.set(key, data, 'ROOT_QUERY');
   };
   public getQuery = <R>(requestId: string): NearQueryState<R> | undefined => {
      return this.get<NearQueryState<R>>(requestId, 'ROOT_QUERY');
   };

   public setContract = (requestId: string, contract: Contract) => {
      this.set(requestId, contract, 'ROOT_CONTRACT');
   };
   public getContract = (requestId: string): Contract | undefined => {
      return this.get<Contract | undefined>(requestId, 'ROOT_CONTRACT');
   };

   public from(fromClient: NearClient): NearClient {
      this.cache = {
         ROOT_QUERY: fromClient.cache.ROOT_QUERY,
         ROOT_CONTRACT: fromClient.cache.ROOT_CONTRACT,
      };

      return this;
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

export function useNearClient(): NearClient {
   const { client } = useNearContext();

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return client;
}

export default createNearClient;
