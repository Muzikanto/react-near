import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type MtBatchTransferCallArgs = {
   amounts: string[];
   token_ids: string[];
   receiver_id: string;
   memo?: string;
   msg: string;
};

function useMtBatchTransferCall<Res = string, Req extends MtBatchTransferCallArgs = MtBatchTransferCallArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('mt_batch_transfer_call', opts);
}

export default useMtBatchTransferCall;
