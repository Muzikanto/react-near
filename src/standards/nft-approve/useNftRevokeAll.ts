import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftApproveMethods } from './methods';

export type NftRevokeAllArgs = {
   token_id: string;
};
export type NftRevokeAllResult = void;

function useNftRevokeAll<Res = NftRevokeAllResult, Req extends NftRevokeAllArgs = NftRevokeAllArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>(NftApproveMethods.nft_revoke_all, opts);
}

export default useNftRevokeAll;
