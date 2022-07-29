import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { FtCoreMethods } from './methods';

export type FtTransferArgs = {
   amount: string;
   receiver_id: string;
   memo?: string;
};
export type FtTransferResult = void;

function useFtTransfer<Res = FtTransferResult, Req extends FtTransferArgs = FtTransferArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>(FtCoreMethods.ft_transfer, opts);
}

export default useFtTransfer;
