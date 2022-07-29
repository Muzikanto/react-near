import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { NftApproveMethods } from './methods';

export type NftIsApprovedArgs = {
   token_id: string;
   approved_account_id: string;
   approval_id?: number;
};
export type NftIsApprovedResult = boolean;

function useNftIsApproved<
   Res extends NftIsApprovedResult = NftIsApprovedResult,
   Req extends NftIsApprovedArgs = NftIsApprovedArgs,
>(contractId: string, opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(NftApproveMethods.nft_is_approved, opts);
}

export default useNftIsApproved;
