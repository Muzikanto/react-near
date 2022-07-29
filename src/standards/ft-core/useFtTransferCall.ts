import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { FtCoreMethods } from './methods';

export type FtTransferCallArgs = {
   amount: string;
   receiver_id: string;
   memo?: string;
   msg: string;
};
export type FtTransferCallResult = string;

function useFtTransferCall<
   Res = FtTransferCallResult,
   Req extends FtTransferCallArgs = FtTransferCallArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(FtCoreMethods.ft_transfer_call, opts);
}

export default useFtTransferCall;
