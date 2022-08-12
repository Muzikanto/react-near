import { FtBalanceOfArgs, FtBalanceOfResult } from '../ft-core/useFtBalanceOf';
import { FtTransferCallArgs, FtTransferCallResult } from '../ft-core/useFtTransferCall';
import { FtTransferArgs, FtTransferResult } from '../ft-core/useFtTransfer';
import { FtTotalSupplyArgs, FtTotalSupplyResult } from '../ft-core/useFtTotalSupply';
import { FtMetadataArgs, FtMetadataResult } from '../ft-core/useFtMetadata';
import { NearChangeMethod, NearViewMethod } from '../../types';
import { NearContract } from '../../contract/useNearContract';

export interface FtContractMetadata {
   spec: string;
   name: string;
   symbol: string;
   icon?: string;
   reference?: string;
   reference_hash?: string;
   decimals: number;
}

export type FtContract = NearContract<{
   ft_balance_of: NearViewMethod<FtBalanceOfArgs, FtBalanceOfResult>;
   ft_metadata: NearViewMethod<FtMetadataArgs, FtMetadataResult>;
   ft_total_supply: NearViewMethod<FtTotalSupplyArgs, FtTotalSupplyResult>;
   ft_transfer: NearChangeMethod<FtTransferArgs, FtTransferResult>;
   ft_transfer_call: NearChangeMethod<FtTransferCallArgs, FtTransferCallResult>;
}>;

export {};
