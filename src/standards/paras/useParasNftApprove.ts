import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftApproveMethods } from '../nft-approve/methods';

export function createParasNftApproveMsg(opts: {
   market_type: 'sale';
   price: string;
   ft_token_id: string;
}): string {
   return JSON.stringify(opts);
}

export type ParasNftApproveArgs = {
   token_id: string;
   account_id: string;
   msg: { market_type: 'sale'; price: string; ft_token_id: string };
};

function useParasNftApprove<Res = void, Req extends ParasNftApproveArgs = ParasNftApproveArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   const [call, info] = useNearMutation<Res, Req>(NftApproveMethods.nft_approve, opts);

   return [
      async (args: Req, attachedDeposit?: string, gas?: number): Promise<Res> =>
         call({ ...args, msg: createParasNftApproveMsg(args.msg) }, attachedDeposit, gas),
      info,
   ] as const;
}

export default useParasNftApprove;
