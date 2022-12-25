import { encodeRequest, NearClient } from '../core/client';

export async function collectNearDataWithoutRender(nearClient: NearClient) {
   const SSR = nearClient.cache.SSR || {};

   for (const key in SSR) {
      const _call = SSR[key];
      const contract = nearClient.getContract(encodeRequest(_call.contractId));

      if (nearClient.exists(key)) {
         continue;
      }

      if (contract && _call.contractId === contract.contractId && _call.methodName in contract) {
         // @ts-ignore
         const res = await contract[_call.methodName](_call.args);
         nearClient.setQuery(key, { data: res, loading: false, error: undefined });
      }
   }
}

export async function collectNearData(nearClient: NearClient, element: JSX.Element) {
   const render = await require('react-dom/server').renderToStaticMarkup;
   render(element);

   await collectNearDataWithoutRender(nearClient);
}
