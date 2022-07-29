import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { MtCoreMethods } from './methods';

export type MtBatchTransferArgs = {
   amount: string;
   receiver_id: string;
   memo?: string;
};
export type MtBatchTransferResult = void;

function useMtBatchTransfer<
   Res = MtBatchTransferResult,
   Req extends MtBatchTransferArgs = MtBatchTransferArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(MtCoreMethods.mt_batch_transfer, opts);
}

export default useMtBatchTransfer;
