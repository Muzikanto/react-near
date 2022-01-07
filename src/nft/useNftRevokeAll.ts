import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftRevokeAllArgs = {
   token_id: string;
};

function useNftRevokeAll<Res = void, Req extends NftRevokeAllArgs = NftRevokeAllArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('nft_revoke_all', opts);
}

export default useNftRevokeAll;
