import React from 'react';
import { NearContext } from '../NearProvider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

function useNearUser(contractId: string) {
   const { wallet, account, client, loading } = React.useContext(NearContext);

   const signedIn = wallet && wallet.isSignedIn();
   // const [account, setAccount] = React.useState<Account | null>(null);
   const [balance, setBalance] = React.useState<number>(
      account ? client.cache.get(account.accountId, 'ROOT_USER') : 0,
   );

   const disconnect = async () => {
      if (wallet) {
         wallet.signOut();
         // TODO: Move redirect to .signOut() ^^^
         window.location.replace(window.location.origin + window.location.pathname);
      }
   };
   const connect = async (title?: string, successUrl?: string, failureUrl?: string) => {
      if (wallet) {
         await wallet.requestSignIn(contractId, title, successUrl, failureUrl);
      }
   };
   const refreshBalance = async () => {
      if (account) {
         const balanceV = +formatNearAmount((await account.getAccountBalance()).available, 2);

         setBalance(balanceV);
         client.cache.set(account.accountId, balanceV, 'ROOT_USER');
      }
   };
   const address: string | null = wallet ? wallet.getAccountId() : null;
   const isConnected = Boolean(signedIn && account);

   React.useEffect(() => {
      if (account) {
         setBalance(client.cache.get(account.accountId, 'ROOT_USER'));
      }
      if (account && !loading) {
         refreshBalance()
            .then()
            .catch((e) => {
               const m = e.message;

               if (
                  m.startsWith('[-32000] Server error: account') &&
                  m.endsWith('does not exist while viewing')
               ) {
                  for (let i = 0; i < localStorage.length; i++) {
                     const key = localStorage.key(i);

                     if (key && key.startsWith('near-api')) {
                        localStorage.removeItem(key);
                     }
                  }

                  disconnect().then();
               }
            });
      }
   }, [account, client, loading]);

   return {
      isConnected,
      address,
      account,
      balance,
      refreshBalance,
      connect,
      disconnect,
      loading,
   };
}

export default useNearUser;
