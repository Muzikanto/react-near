import React from 'react';

export type NearStatus = {
   transactionHashes?: string[];
   error?: string;
   errorCode?: string;
};

function useNearStatus(): NearStatus {
   const data = React.useMemo((): NearStatus => {
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
