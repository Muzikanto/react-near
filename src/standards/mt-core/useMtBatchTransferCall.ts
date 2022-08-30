import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { MtCoreMethods } from './methods';
import { GAS_FOR_MT_TRANSFER_CALL } from "../mt/gas";

export type MtBatchTransferCallArgs = {
   amounts: string[];
   token_ids: string[];
   receiver_id: string;
   memo?: string;
   msg: string;
};
export type MtBatchTransferCallResult = string[];

function useMtBatchTransferCall<
   Res = MtBatchTransferCallResult,
   Req extends MtBatchTransferCallArgs = MtBatchTransferCallArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(MtCoreMethods.mt_batch_transfer_call, { ...opts, gas: opts.gas || GAS_FOR_MT_TRANSFER_CALL });
}

export default useMtBatchTransferCall;
