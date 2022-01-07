import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftRevokeAllArgs = {
   token_id: string;
};

function useNftRevokeAll<Res = void, Req extends NftRevokeAllArgs = NftRevokeAllArgs>(
   opts: Omit<NearMutationOptions<Res, Req>, 'methodName'> & { methodName?: string },
) {
   return useNearMutation<Res, Req>({ methodName: 'nft_revoke_all', ...opts });
}

export default useNftRevokeAll;
