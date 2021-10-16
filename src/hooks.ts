import React from 'react';
import { Near, WalletConnection, Contract, Account, utils } from 'near-api-js';
import { NearContext } from './NearProvider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { NEAR_GAS } from './config';

export type NearContract = Contract & {
   fCall: <T>(methodName: string, args: { [key: string]: any }, price: number) => Promise<T>;
};

function useNear(): Near | null {
   const { near } = React.useContext(NearContext);
   const state = near as Near | null;

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return state;
}

function useNearWallet(): WalletConnection | null {
   const { wallet } = React.useContext(NearContext);

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet as WalletConnection | null;
}

function useNearAccount(): Account | null {
   const { wallet } = React.useContext(NearContext);

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet ? wallet.account() : null;
}

function useNearContract(
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): NearContract | null {
   const account = useNearAccount();
   const wallet = useNearWallet();
   const contract = React.useMemo(
      () => (wallet ? new Contract(wallet.account(), contractId, contractMethods) : null),
      [wallet],
   );

   if (contract) {
      // @ts-ignore
      contract.fCall = function (
         methodName: string,
         args: { [key: string]: any } = {},
         nears?: number,
      ) {
         if (account) {
            return account.functionCall(
               contractId,
               methodName,
               args,
               NEAR_GAS,
               nears ? (utils.format.parseNearAmount(nears.toString()) as any) : undefined,
            ) as any;
         }

         return Promise.reject('Account not connected');
      };
   }

   return wallet ? (contract as NearContract) : null;
}

function useNearUser(contractId: string) {
   const { wallet, account } = React.useContext(NearContext);

   const signedIn = wallet && wallet.isSignedIn();
   // const [account, setAccount] = React.useState<Account | null>(null);
   const [balance, setBalance] = React.useState<number>(0);

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
      }
   };
   const address: string | null = wallet ? wallet.getAccountId() : null;
   const isConnected = Boolean(signedIn && account);

   React.useEffect(() => {
      if (account) {
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
   }, [account]);

   return {
      isConnected,
      address,
      account,
      balance,
      refreshBalance,
      connect,
      disconnect,
   };
}

export { useNear, useNearWallet, useNearUser, useNearAccount, useNearContract };
