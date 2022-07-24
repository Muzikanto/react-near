import { encodeRequest, NearClient } from './core/client';

export async function collectNearData(nearClient: NearClient, element: JSX.Element) {
   const render = await require('react-dom/server').renderToStaticMarkup;
   render(element);

   const SSR = nearClient.cache.data.SSR || {};

   for (const key in SSR) {
      const _call = SSR[key];
      const contract = nearClient.cache.getContract(encodeRequest(_call.contractId));

      if (nearClient.cache.exists(key)) {
         continue;
      }

      if (contract && _call.contractId === contract.contractId && _call.methodName in contract) {
         // @ts-ignore
         const res = await contract[_call.methodName](_call.args);
         nearClient.cache.setQuery(key, { data: res, loading: false, error: undefined });
      }
   }
}
