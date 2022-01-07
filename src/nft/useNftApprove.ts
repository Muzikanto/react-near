import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftApproveArgs = {
   token_id: string;
   account_id: string;
   msg?: string;
};

function useNftApprove<Res = void, Req extends NftApproveArgs = NftApproveArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('nft_approve', opts);
}

export default useNftApprove;
