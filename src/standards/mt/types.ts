import { MtCoreMethods } from '../mt-core/methods';
import { MtBalanceOfArgs, MtBalanceOfResult } from '../mt-core/useMtBalanceOf';
import { MtTotalSupplyArgs, MtTotalSupplyResult } from '../mt-core/useMtTotalSupply';
import { MtBatchTransferArgs, MtBatchTransferResult } from '../mt-core/useMtBatchTransfer';
import {
   MtBatchTransferCallArgs,
   MtBatchTransferCallResult,
} from '../mt-core/useMtBatchTransferCall';

export interface MtContractMetadata {
   spec: string;
   name: string;
   symbol: string;
   icon?: string;
   reference?: string;
   reference_hash?: string;
   decimals: number;
}

export type MtContract = {
   [MtCoreMethods.mt_balance_of]: (args: MtBalanceOfArgs) => Promise<MtBalanceOfResult>;
   [MtCoreMethods.mt_total_supply]: (args: MtTotalSupplyArgs) => Promise<MtTotalSupplyResult>;
   [MtCoreMethods.mt_batch_transfer]: (args: MtBatchTransferArgs) => Promise<MtBatchTransferResult>;
   [MtCoreMethods.mt_batch_transfer_call]: (
      args: MtBatchTransferCallArgs,
   ) => Promise<MtBatchTransferCallResult>;
};

export {};
