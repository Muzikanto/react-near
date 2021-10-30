import React from 'react';
import { NearContext } from '../NearProvider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

function useNearUser(contractId: string) {
  const { wallet, account, client } = React.useContext(NearContext);

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
      client.set(account.accountId, balanceV, 'USER');
    }
  };
  const address: string | null = wallet ? wallet.getAccountId() : null;
  const isConnected = Boolean(signedIn && account);

  React.useEffect(() => {
    if (account && typeof client.get(account.accountId, 'USER') === 'undefined') {
      refreshBalance()
        .then()
        .catch(e => {
          const m = e.message;

          if (m.startsWith('[-32000] Server error: account') && m.endsWith('does not exist while viewing')) {
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

export default useNearUser;
