import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftRevokeArgs = {
   token_id: string;
   account_id: string;
};

function useNftRevoke<Res = void, Req extends NftRevokeArgs = NftRevokeArgs>(
   contractId: string,
   opts: NearMutationOptions<Res, Req> = {},
) {
   return useNearMutation<Res, Req>(contractId, 'nft_revoke', opts);
}

export default useNftRevoke;
