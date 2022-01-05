import { NearQueryOptions, useNearQuery } from '../hooks';

export type NftIsApprovedArgs = {
   token_id: string,
   approved_account_id: string,
   approval_id?: number
};
export type eNftIsApprovedResult = boolean;

function useNftIsApproved<
   Res extends eNftIsApprovedResult = eNftIsApprovedResult,
   Req extends NftIsApprovedArgs = NftIsApprovedArgs,
>(contractId: string, opts: NearQueryOptions<Res, Req> = {}) {
   return useNearQuery<Res, Req>(contractId, 'nft_is_approved', opts);
}

export default useNftIsApproved;
