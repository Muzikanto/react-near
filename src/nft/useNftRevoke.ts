import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftRevokeArgs = {
   token_id: string;
   account_id: string;
};

function useNftRevoke<Res = void, Req extends NftRevokeArgs = NftRevokeArgs>(
   opts: Omit<NearMutationOptions<Res, Req>, 'methodName'> & { methodName?: string },
) {
   return useNearMutation<Res, Req>({ methodName: 'nft_revoke', ...opts });
}

export default useNftRevoke;
