import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type MtBatchTransferArgs = {
   amount: string;
   receiver_id: string;
   memo?: string;
};

function useMtBatchTransfer<Res = void, Req extends MtBatchTransferArgs = MtBatchTransferArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('mt_batch_transfer', opts);
}

export default useMtBatchTransfer;
