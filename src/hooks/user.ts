import { useNear } from '..';
import React from 'react';
import { Optional } from '@near-wallet-selector/core/lib/utils.types';
import { Transaction } from '@near-wallet-selector/core/lib/wallet/transactions.types';

interface SignAndSendTransactionsParams {
   transactions: Array<Optional<Transaction, 'signerId'>>;
}

function useNearUser() {
   const { accountId, modal, selector } = useNear();

   const address: string | null = accountId;
   const isConnected = Boolean(accountId);

   const connect = React.useCallback(() => {
      if (!modal) {
         return;
      }

      modal.show();
   }, [modal]);
   const disconnect = React.useCallback(() => {
      if (!selector) {
         return;
      }

      selector.wallet().then((w) => w.signOut());
   }, [selector]);

   const signAndSendTransactions = React.useCallback(
      async (params: SignAndSendTransactionsParams): Promise<any> => {
         if (!selector) {
            return;
         }

         const wallet = await selector.wallet();

         return await wallet.signAndSendTransactions(params);
      },
      [selector, accountId],
   );

   return {
      isConnected,
      address,
      connect,
      disconnect,
      signAndSendTransactions,
   };
}

export default useNearUser;
