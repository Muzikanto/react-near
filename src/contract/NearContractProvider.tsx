import React from 'react';
import {ConnectConfig} from 'near-api-js';
import {NearContract} from './useNearContract';

export interface NearContractContextType {
    contract?: NearContract | null;
}

export type NearContractProviderProps = Partial<ConnectConfig> & {
    contract?: NearContract | null;
};

export const NearContractContext = React.createContext<NearContractContextType>({});

const NearContractProvider: React.FC<React.PropsWithChildren<NearContractProviderProps>> = ({
    contract,
    children
}) => {
    return (
        <NearContractContext.Provider value={{contract}}>{children}</NearContractContext.Provider>
    );
};

export default NearContractProvider;