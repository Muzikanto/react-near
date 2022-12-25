import type { ReactNode } from 'react';
import React from 'react';
import { map, distinctUntilChanged } from 'rxjs';
import { setupWalletSelector } from '@near-wallet-selector/core';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { NearEnvironment } from '..';
import { providers } from 'near-api-js';
import { JsonRpcProvider } from 'near-api-js/lib/providers';
import createNearClient, { NearClient } from './client';

export type NearProviderDefaultState = {
   accounts: Array<AccountState>;
   modal: WalletSelectorModal;
   selector: WalletSelector;
};
export type NearProviderState = {
   selector?: WalletSelector;
   modal?: WalletSelectorModal;
   accounts: Array<AccountState>;
   accountId: string | null;
   provider?: JsonRpcProvider;
   client: NearClient;
};
export type NearProviderProps = {
   children: ReactNode;
   authContractId: string;
   environment?: NearEnvironment;
   defaultClient?: NearClient;
};

export const NearContext = React.createContext<NearProviderState | null>(null);

export async function makeNearProviderState({
   environment = NearEnvironment.TestNet,
   authContractId,
}: Pick<NearProviderProps, 'environment' | 'authContractId'>): Promise<NearProviderDefaultState> {
   const selector = await setupWalletSelector({
      network: environment,
      debug: true,
      modules: [...(await setupDefaultWallets()), setupNearWallet()],
   });
   const modal = setupModal(selector, { contractId: authContractId });
   const state = selector.store.getState();

   return {
      selector,
      accounts: state.accounts,
      modal,
   };
}

export const NearProvider: React.FC<NearProviderProps> = ({
   children,
   authContractId,
   environment = NearEnvironment.TestNet,
   defaultClient,
}) => {
   const [selector, setSelector] = React.useState<WalletSelector | undefined>(undefined);
   const [modal, setModal] = React.useState<WalletSelectorModal | undefined>(undefined);
   const [accounts, setAccounts] = React.useState<Array<AccountState>>([]);

   const client = React.useMemo(
      () => (defaultClient instanceof NearClient ? defaultClient : createNearClient(defaultClient)),
      [],
   );

   const init = React.useCallback(async () => {
      const s = await makeNearProviderState({ authContractId, environment });

      setAccounts(s.accounts);
      setSelector(s.selector);
      setModal(s.modal);
   }, [environment, authContractId]);

   React.useEffect(() => {
      if (typeof window !== 'undefined') {
         init().catch((err) => {
            console.error(err);
            alert('Failed to initialise wallet selector');
         });
      }
   }, [init]);

   React.useEffect(() => {
      if (!selector) {
         return;
      }

      const subscription = selector.store.observable
         .pipe(
            map((state) => state.accounts),
            distinctUntilChanged(),
         )
         .subscribe((nextAccounts) => {
            setAccounts(nextAccounts);
         });

      return () => subscription.unsubscribe();
   }, [selector]);

   const accountId = accounts.find((account) => account.active)?.accountId || null;

   const provider = selector
      ? new providers.JsonRpcProvider(selector.options.network.nodeUrl)
      : undefined;

   return (
      <NearContext.Provider
         value={{
            selector,
            modal,
            accounts,
            accountId,
            provider,
            client,
         }}
      >
         {children}
      </NearContext.Provider>
   );
};
