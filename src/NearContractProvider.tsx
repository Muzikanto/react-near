import React from 'react';
import { ConnectConfig, Contract } from 'near-api-js';

export interface NearContractContextType {
   contract?: Contract | null;
}

export type NearContractProviderProps = Partial<ConnectConfig> & {
   contract?: Contract | null;
};

export const NearContractContext = React.createContext<NearContractContextType>({});

const NearContractProvider: React.FC<NearContractProviderProps> = ({ contract, children }) => {
   return (
      <NearContractContext.Provider value={{ contract }}>{children}</NearContractContext.Provider>
   );
};

export default NearContractProvider;
