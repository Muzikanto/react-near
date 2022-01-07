import { NearQueryOptions, useNearQuery } from '../hooks';

export type NftIsApprovedArgs = {
   token_id: string,
   approved_account_id: string,
   approval_id?: number
};
export type NftIsApprovedResult = boolean;

function useNftIsApproved<
   Res extends NftIsApprovedResult = NftIsApprovedResult,
   Req extends NftIsApprovedArgs = NftIsApprovedArgs,
>(opts: Omit<NearQueryOptions<Res, Req>, 'methodName'> & { methodName?: string }) {
   return useNearQuery<Res, Req>({methodName: 'nft_is_approved', ...opts});
}

export default useNftIsApproved;
