import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftRevokeArgs = {
   token_id: string;
   account_id: string;
};

function useNftRevoke<Res = void, Req extends NftRevokeArgs = NftRevokeArgs>(
   opts: NearMutationOptions<Res, Req> = {},
) {
   return useNearMutation<Res, Req>('nft_revoke', opts);
}

export default useNftRevoke;
