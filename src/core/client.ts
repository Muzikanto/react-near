export type NearClient = {
   cache: { [key: string]: any };
   set: (key: string, value: any, rootId?: string) => void;
   get: (key: string, rootId?: string) => any;
   encodeRequest: (methodName: string, args: { [key: string]: any }) => string;
};

const getNearClient = (): NearClient => {
   const cache: { [key: string]: any } = {};

   const set = <T>(key: string, value: T, rootId?: string) => {
      if (rootId) {
         if (!cache[rootId]) {
            cache[rootId] = {};
         }

         cache[rootId][key] = value;

         return;
      }
      cache[key] = value;
   };

   const get = <T>(key: string, rootId?: string): T | null => {
      if (rootId) {
         return (cache[rootId] || {})[key];
      } else {
         return cache[key];
      }
   };

   const encodeRequest = (methodName: string, args: { [key: string]: any }) => {
      return `${methodName}(${JSON.stringify(args)})`;
   };

   return {
      cache,
      set,
      get,
      encodeRequest,
   };
};

export default getNearClient;
