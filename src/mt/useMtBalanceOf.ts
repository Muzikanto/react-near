import { NearQueryOptions, useNearQuery } from '../hooks';

export type MtBalanceOfArgs = {
   account_id: string;
   token_id: string;
};

function useMtBalanceOf<Res = string, Req extends MtBalanceOfArgs = MtBalanceOfArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>('mt_balance_of', opts);
}

export default useMtBalanceOf;
