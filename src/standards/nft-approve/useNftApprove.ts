import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftApproveMethods } from './methods';

export type NftApproveArgs = {
   token_id: string;
   account_id: string;
   msg?: string;
};
export type NftApproveResult = void;

function useNftApprove<Res = NftApproveResult, Req extends NftApproveArgs = NftApproveArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>(NftApproveMethods.nft_approve, opts);
}

export default useNftApprove;
