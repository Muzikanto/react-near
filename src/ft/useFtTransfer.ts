import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type FtTransferArgs = {
   amount: string;
   receiver_id: string;
};

function useFtTransfer<Res = void, Req extends FtTransferArgs = FtTransferArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('ft_transfer', opts);
}

export default useFtTransfer;
