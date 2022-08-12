import React from 'react';

export type UseNearStatus = {
   transactionHashes?: string[];
   error?: string;
   errorCode?: string;
};

function useNearStatus(): UseNearStatus {
   const data = React.useMemo((): UseNearStatus => {
      if (typeof window !== 'undefined') {
         // @ts-ignore
         const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
         const transactionHashes = params.transactionHashes
            ? ((params.transactionHashes || '').split(',') as string[])
            : undefined;

         if (params.errorMessage) {
            return {
               errorCode: params.errorCode as string,
               error: params.errorMessage as string,
               transactionHashes,
            };
         }

         return {
            transactionHashes,
         };
      }

      return {};
   }, []);

   return data;
}

export default useNearStatus;
