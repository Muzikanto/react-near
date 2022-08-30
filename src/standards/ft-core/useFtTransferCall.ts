import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { FtCoreMethods } from './methods';
import { GAS_FOR_FT_TRANSFER_CALL } from '../ft/gas';

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
   return useNearMutation<Res, Req>(FtCoreMethods.ft_transfer_call, {
      ...opts,
      gas: opts.gas || GAS_FOR_FT_TRANSFER_CALL,
   });
}

export default useFtTransferCall;
