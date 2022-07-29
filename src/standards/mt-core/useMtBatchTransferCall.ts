import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { MtCoreMethods } from './methods';

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
   return useNearMutation<Res, Req>(MtCoreMethods.mt_batch_transfer_call, opts);
}

export default useMtBatchTransferCall;
