import React from 'react';
import { ConnectConfig } from 'near-api-js';
import { NearContract } from './useNearContract';
export interface NearContractContextType {
    contract?: NearContract | null;
}
export declare type NearContractProviderProps = Partial<ConnectConfig> & {
    contract?: NearContract | null;
};
export declare const NearContractContext: React.Context<NearContractContextType>;
declare const NearContractProvider: React.FC<NearContractProviderProps>;
export default NearContractProvider;
