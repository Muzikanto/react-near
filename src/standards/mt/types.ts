import { MtBalanceOfArgs, MtBalanceOfResult } from '../mt-core/useMtBalanceOf';
import { MtTotalSupplyArgs, MtTotalSupplyResult } from '../mt-core/useMtTotalSupply';
import { MtBatchTransferArgs } from '../mt-core/useMtBatchTransfer';
import {
   MtBatchTransferCallArgs,
   MtBatchTransferCallResult,
} from '../mt-core/useMtBatchTransferCall';
import { NearChangeMethod, NearViewMethod } from '../../types';
import { Contract } from 'near-api-js';

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
   mt_balance_of: NearViewMethod<MtBalanceOfArgs, MtBalanceOfResult>;
   mt_total_supply: NearViewMethod<MtTotalSupplyArgs, MtTotalSupplyResult>;
   mt_batch_transfer: NearChangeMethod<MtBatchTransferArgs, MtBatchTransferArgs>;
   mt_batch_transfer_call: NearChangeMethod<MtBatchTransferCallArgs, MtBatchTransferCallResult>;
} & Contract;

export {};
