import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type FtTransferCallArgs = {
   amount: string;
   receiver_id: string;
   memo?: string;
   msg: string;
};

function useFtTransferCall<Res = string, Req extends FtTransferCallArgs = FtTransferCallArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('ft_transfer_call', opts);
}

export default useFtTransferCall;
