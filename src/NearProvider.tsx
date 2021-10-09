import React from 'react';
import { Near, ConnectConfig, WalletConnection, connect, keyStores, Account } from 'near-api-js';
import getNearConfig from './config';

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
}

export type NearProviderProps = ConnectConfig & {
   environment?: NearEnvironment;
};

export const NearContext = React.createContext<NearContextType>({});

const NearProvider: React.FC<NearProviderProps> = ({
   environment = NearEnvironment.TestNet,
   children,
   ...props
}) => {
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

   const [near, setNear] = React.useState<Near>();
   const [wallet, setWallet] = React.useState<WalletConnection>();

   React.useEffect(() => {
      if (config && typeof window !== 'undefined') {
         const setup = async function (): Promise<void> {
            const nearInstance = await connect(config);
            const walletInstance = new WalletConnection(nearInstance, null);

            setNear(nearInstance);
            setWallet(walletInstance);
         };

         setup().catch((err) => {
            console.error(err);
         });
      }
   }, [config]);

   return (
      <NearContext.Provider
         value={{ near, wallet, account: wallet ? wallet.account() : undefined }}
      >
         {children}
      </NearContext.Provider>
   );
};

export default NearProvider;
