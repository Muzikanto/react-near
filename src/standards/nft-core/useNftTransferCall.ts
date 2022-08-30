import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftCoreMethods } from './methods';
import { GAS_FOR_NFT_TRANSFER_CALL } from "../nft/gas";

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
   return useNearMutation<Res, Req>(NftCoreMethods.nft_transfer_call, { ...opts, gas: opts.gas || GAS_FOR_NFT_TRANSFER_CALL });
}

export default useNftTransferCall;
