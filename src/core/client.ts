export type NearClient = {
   cache: {
      data: { [key: string]: any };
      set: (key: string, value: any, rootId?: string) => void;
      get: (key: string, rootId?: string) => any;
      watch: (key: string, watcher: (v: any) => void, rootId?: string) => () => void;
   };
};

export function encodeRequest(contractId: string, methodName: string, args: { [key: string]: any }) {
   return `${contractId}.${methodName}(${JSON.stringify(args)})`;
}

const getNearClient = (): NearClient => {
   const watchers: {
      [key: string]: {
         [key: string]: Array<(v: any) => void>;
      };
   } = {};
   const cache: { [key: string]: any } = {};

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

   const get = <T>(key: string, rootId: string = 'ROOT'): T | null => {
      if (rootId) {
         return (cache[rootId] || {})[key];
      } else {
         return cache[key];
      }
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

   const client: NearClient & { watchers: any } = {
      cache: {
         data: cache,
         set,
         get,
         watch,
      },
      watchers,
   };

   if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__NEAR_CLIENT__ = client;
   }

   return client;
};

export default getNearClient;
