import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { NftPayout } from './types';
import { NftPayoutMethods } from './methods';

export type NftPayoutArgs = { token_id: String; balance: string; max_len_payout: number };
export type NftPayoutResult = NftPayout;

function useNftPayout<
   Res extends NftPayoutResult = NftPayoutResult,
   Req extends NftPayoutArgs = NftPayoutArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(NftPayoutMethods.nft_payout, opts);
}

export default useNftPayout;
