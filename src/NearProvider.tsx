import React from 'react';
import { Near, ConnectConfig, WalletConnection, connect, keyStores, Account } from 'near-api-js';
import getNearConfig from './config';
import getNearClient, { NearClient } from './core/client';
import { useNearEnvironment } from './environment';

export enum NearEnvironment {
   MainNet = 'mainnet',
   TestNet = 'testnet',
   BetaNet = 'betanet',
   Test = 'test',
   Local = 'local',
}

export interface NearContextType {
   near?: Near;
   wallet?: WalletConnection;
   account?: Account;
   client: NearClient;
   loading?: boolean;
}

export type NearProviderProps = Partial<ConnectConfig> & {
   environment?: NearEnvironment;
};

export const NearContext = React.createContext<NearContextType>({ client: null as any });

const NearProvider: React.FC<NearProviderProps> = ({
   environment: defaultEnvironment,
   children,
   ...props
}) => {
   const env = useNearEnvironment();
   const environment = (env.isProvided ? defaultEnvironment || env.value : defaultEnvironment) || NearEnvironment.TestNet;

   const client = React.useMemo(() => getNearClient(), []);
   const config: ConnectConfig | null = React.useMemo(() => {
      if (typeof window === 'undefined') {
         return null;
      }

      return {
         ...getNearConfig(environment),
         deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
         ...props,
      };
   }, [props, environment]);

   const [state, setState] = React.useState<{
      near: Near | undefined;
      wallet: WalletConnection | undefined;
      loading: boolean;
   }>({
      near: undefined,
      wallet: undefined,
      loading: true,
   });

   React.useEffect(() => {
      if (config && typeof window !== 'undefined') {
         const setup = async function (): Promise<void> {
            const nearInstance = await connect(config);
            const walletInstance = new WalletConnection(nearInstance, null);

            setState({ loading: false, wallet: walletInstance, near: nearInstance });
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
