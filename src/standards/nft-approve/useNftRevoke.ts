import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftApproveMethods } from './methods';

export type NftRevokeArgs = {
   token_id: string;
   account_id: string;
};
export type NftRevokeResult = void;

function useNftRevoke<Res = NftRevokeResult, Req extends NftRevokeArgs = NftRevokeArgs>(
   opts: NearMutationOptions<Res, Req> = {},
) {
   return useNearMutation<Res, Req>(NftApproveMethods.nft_revoke, opts);
}

export default useNftRevoke;
