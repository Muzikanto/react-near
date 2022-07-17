import { NearQueryOptions, useNearQuery } from '../hooks';

export type FtBalanceOfArgs = {
   account_id: string;
};

function useFtBalanceOf<Res = string, Req extends FtBalanceOfArgs = FtBalanceOfArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>('ft_balance_of', opts);
}

export default useFtBalanceOf;
