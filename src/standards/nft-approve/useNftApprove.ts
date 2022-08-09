import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftApproveMethods } from './methods';
import { GAS_FOR_NFT_APPROVE } from "../nft/gas";

export type NftApproveArgs = {
   token_id: string;
   account_id: string;
   msg?: string;
};
export type NftApproveResult = void;

function useNftApprove<Res = NftApproveResult, Req extends NftApproveArgs = NftApproveArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>(NftApproveMethods.nft_approve, { ...opts, gas: GAS_FOR_NFT_APPROVE || opts.gas });
}

export default useNftApprove;
