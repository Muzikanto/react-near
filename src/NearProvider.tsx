import React from 'react';
import { Near, ConnectConfig, WalletConnection, connect, keyStores, Account } from 'near-api-js';
import getNearConfig, { NearEnvironment } from './config';
import getNearClient, { NearClient } from './core/client';
import { useNearEnvironment } from './environment';

export interface NearContextType {
   near?: Near;
   wallet?: WalletConnection;
   account?: Account;
   client: NearClient;
   loading?: boolean;
}
export type NearProviderState = {
   near: Near | undefined;
   wallet: WalletConnection | undefined;
   loading: boolean;
};

export type NearProviderProps = Partial<ConnectConfig> & {
   environment?: NearEnvironment;
   defaultState?: NearProviderState;
   defaultClient?: NearClient;
};

export const NearContext = React.createContext<NearContextType>({ client: null as any });

export async function makeNearProviderState({
   environment = NearEnvironment.TestNet,
   ...props
}: Partial<ConnectConfig> & {
   environment: NearEnvironment;
}): Promise<NearProviderState & { near: Near }> {
   const config = {
      ...getNearConfig(environment),
      deps: {
         keyStore:
            typeof window === 'undefined'
               ? new keyStores.InMemoryKeyStore()
               : new keyStores.BrowserLocalStorageKeyStore(),
      },
      ...props,
   };

   const nearInstance = await connect(config);
   const walletInstance =
      typeof window === 'undefined' ? undefined : new WalletConnection(nearInstance, null);

   return { near: nearInstance, wallet: walletInstance, loading: false };
}

const NearProvider: React.FC<React.PropsWithChildren<NearProviderProps>> = ({
   environment: forceEnvironment,
   children,
   defaultState,
   defaultClient,
   ...props
}) => {
   const env = useNearEnvironment();
   const environment = forceEnvironment || env.value || NearEnvironment.TestNet;

   const client = React.useMemo(() => defaultClient || getNearClient(), []);

   const [state, setState] = React.useState<NearProviderState>(
      defaultState || {
         near: undefined,
         wallet: undefined,
         loading: true,
      },
   );

   React.useEffect(() => {
      if (typeof window !== 'undefined') {
         const setup = async function (): Promise<void> {
            const nextState = await makeNearProviderState({
               environment,
               ...props,
            });

            setState(nextState);
         };

         setup()
            .then()
            .catch((err) => {
               console.error('NEAR Error!', err);
            });
      }
   }, []);

   return (
      <NearContext.Provider
         value={{
            near: state.near,
            wallet: state.wallet,
            account: state.wallet ? state.wallet.account() : undefined,
            client,
            loading: state.loading,
         }}
      >
         {children}
      </NearContext.Provider>
   );
};

export default NearProvider;
