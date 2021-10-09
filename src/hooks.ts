import React from 'react';
import { Near, WalletConnection, Contract } from 'near-api-js';
import { NearContext } from './NearProvider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

const useNear = (): Near | null => {
   const { near } = React.useContext(NearContext);
   const state = near as Near | null;

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return state;
};

const useNearWallet = (): WalletConnection | null => {
   const { wallet } = React.useContext(NearContext);

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet as WalletConnection | null;
};

export const useNearContract = (
   contractId: string,
   contractMethods: { viewMethods: string[]; changeMethods: string[] },
): Contract | null => {
   const wallet = useNearWallet();

   return wallet ? new Contract(wallet.account(), contractId, contractMethods) : null;
};

const useNearUser = (contract: Contract | null) => {
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
      if (wallet && contract) {
         await wallet.requestSignIn(contract.contractId, title, successUrl, failureUrl);
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
      refreshBalance().then();
   }, []);

   return {
      isConnected,
      address,
      account,
      balance,
      refreshBalance,
      connect,
      disconnect,
   };
};

export { useNear, useNearWallet, useNearUser };
