import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftCoreMethods } from './methods';

export type NftTransferCallArgs = {
   receiver_id: string;
   token_id: string;
   approval_id?: number;
   memo?: string;
   msg: string;
};
export type NftTransferCallResult = void;

function useNftTransferCall<
   Res = NftTransferCallResult,
   Req extends NftTransferCallArgs = NftTransferCallArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(NftCoreMethods.nft_transfer_call, opts);
}

export default useNftTransferCall;
