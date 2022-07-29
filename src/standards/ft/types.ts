import { FtCoreMethods } from '../ft-core/methods';
import { FtBalanceOfArgs, FtBalanceOfResult } from '../ft-core/useFtBalanceOf';
import { FtTransferCallArgs, FtTransferCallResult } from '../ft-core/useFtTransferCall';
import { FtTransferArgs, FtTransferResult } from '../ft-core/useFtTransfer';
import { FtTotalSupplyArgs, FtTotalSupplyResult } from '../ft-core/useFtTotalSupply';
import { FtMetadataArgs, FtMetadataResult } from '../ft-core/useFtMetadata';

export interface FtContractMetadata {
   spec: string;
   name: string;
   symbol: string;
   icon?: string;
   reference?: string;
   reference_hash?: string;
   decimals: number;
}

export type FtContract = {
   [FtCoreMethods.ft_balance_of]: (args: FtBalanceOfArgs) => Promise<FtBalanceOfResult>;
   [FtCoreMethods.ft_metadata]: (args: FtMetadataArgs) => Promise<FtMetadataResult>;
   [FtCoreMethods.ft_total_supply]: (args: FtTotalSupplyArgs) => Promise<FtTotalSupplyResult>;
   [FtCoreMethods.ft_transfer]: (args: FtTransferArgs) => Promise<FtTransferResult>;
   [FtCoreMethods.ft_transfer_call]: (args: FtTransferCallArgs) => Promise<FtTransferCallResult>;
};

export {};
