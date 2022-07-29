import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftPayout } from './types';
import { NftPayoutMethods } from './methods';

export type NftTransferPayoutArgs = {
   receiver_id: string;
   token_id: string;
   approval_id: number;
   balance: string;
   max_len_payout: number;
};
export type NftTransferPayoutResult = NftPayout;

function useNftApprove<
   Res = NftTransferPayoutResult,
   Req extends NftTransferPayoutArgs = NftTransferPayoutArgs,
>(opts: NearMutationOptions<Res, Req>) {
   return useNearMutation<Res, Req>(NftPayoutMethods.nft_transfer_payout, opts);
}

export default useNftApprove;
