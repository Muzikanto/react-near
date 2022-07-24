import React from 'react';
import { NearContext } from '../NearProvider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import * as nearApi from 'near-api-js';
import { Near, WalletConnection } from 'near-api-js';
import { baseDecode } from 'borsh';
import { Transaction } from 'near-api-js/lib/transaction';

export async function createNearTransaction(
   near: Near,
   wallet: WalletConnection,
   senderId: string,
   receiverId: string,
   actions: nearApi.transactions.Action[],
   nonceOffset: number = 1,
) {
   const localKey = await near.connection.signer.getPublicKey(senderId, near.connection.networkId);
   let accessKey = await wallet._connectedAccount.accessKeyForTransaction(
      receiverId,
      actions,
      localKey,
   );

   if (!accessKey) {
      throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
   }

   const block = await near.connection.provider.block({ finality: 'final' });

   const blockHash = baseDecode(block.header.hash);

   const publicKey = nearApi.utils.PublicKey.from(accessKey.public_key);
   const nonce = accessKey.access_key.nonce + nonceOffset;

   const tx = nearApi.transactions.createTransaction(
      senderId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash,
   );

   return tx;
}

function useNearUser(contractId: string) {
   const { wallet, account, client, loading, near } = React.useContext(NearContext);

   const signedIn = wallet && wallet.isSignedIn();
   const address: string | null = wallet ? wallet.getAccountId() : null;
   const isConnected = Boolean(signedIn && account);

   // const [account, setAccount] = React.useState<Account | null>(null);
   const [balance, setBalance] = React.useState<number>(
      account ? client.cache.get(account.accountId, 'ROOT_USER') : 0,
   );

   const disconnect = React.useCallback(async () => {
      if (wallet) {
         wallet.signOut();
         // TODO: Move redirect to .signOut() ^^^
         window.location.replace(window.location.origin + window.location.pathname);
      }
   }, [wallet]);
   const connect = React.useCallback(
      async (title?: string, successUrl?: string, failureUrl?: string) => {
         if (wallet) {
            await wallet.requestSignIn(contractId, title, successUrl, failureUrl);
         }
      },
      [wallet],
   );
   const refreshBalance = React.useCallback(async () => {
      if (account) {
         const balanceV = +(formatNearAmount((await account.getAccountBalance()).available, 2)).split(',').join('');

         setBalance(balanceV);
         client.cache.set(account.accountId, balanceV, 'ROOT_USER');
      }
   }, [account, client]);
   const createTransaction = React.useCallback(
      async (
         receiverId: string,
         actions: nearApi.transactions.Action[],
         nonceOffset: number = 1,
      ) => {
         if (!near || !wallet || !address) {
            throw new Error('Not found near ctx');
         }

         return createNearTransaction(near, wallet, address, receiverId, actions, nonceOffset);
      },
      [near, wallet, address],
   );
   const signTransactions = React.useCallback(
      async (
         transactions: Transaction[],
         opts: {
            callbackUrl?: string;
            /** meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param */
            meta?: string;
         } = {},
      ) => {
         if (!wallet) {
            throw new Error('Not found near ctx');
         }

         await wallet.requestSignTransactions({
            transactions,
            ...opts,
         });
      },
      [wallet],
   );

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
      createTransaction,
      signTransactions,
   };
}

export default useNearUser;
