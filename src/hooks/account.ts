import { AccountView } from 'near-api-js/lib/providers/provider';
import React from 'react';
import { formatNearPrice } from '../utils';
import useNear from './near';

export type NearAccount = {
   accountId: string | null;
   balance: number;
   account: AccountView;
   refresh: () => void;
};

export const useNearAccount = (accountId: string | null): NearAccount | undefined => {
   const { client, provider } = useNear();
   const [account, setAccount] = React.useState<AccountView | null>(null);

   const refresh = React.useCallback(async () => {
      if (!accountId || !provider) {
         return null;
      }

      return provider
         .query<AccountView>({
            request_type: 'view_account',
            finality: 'final',
            account_id: accountId,
         })
         .then((res) => {
            setAccount(res);

            client.set(accountId, res, 'NEAR_USER');

            return res;
         })
         .catch(console.error);
   }, [accountId, client, provider]);

   React.useEffect(() => {
      refresh();
   }, [accountId, client, provider]);

   return account
      ? { account, balance: formatNearPrice(account.amount, 2), refresh, accountId: accountId }
      : undefined;
};
