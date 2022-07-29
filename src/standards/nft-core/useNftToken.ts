import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { NftToken } from '../nft/types';
import { NftCoreMethods } from './methods';

export type NftTokenArgs = { token_id: string };
export type NftTokenResult = NftToken;

function useNftToken<
   Res extends NftTokenResult = NftTokenResult,
   Req extends NftTokenArgs = NftTokenArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(NftCoreMethods.nft_token, opts);
}

export default useNftToken;
