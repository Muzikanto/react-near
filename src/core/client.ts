const nearClient = (() => {
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
})();

if (typeof window !== 'undefined') {
   // @ts-ignore
   window.__NEAR_CLIENT__ = nearClient;
}

export default nearClient;
