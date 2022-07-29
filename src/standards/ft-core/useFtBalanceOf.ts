import { FtCoreMethods } from './methods';
import useNearQuery, { NearQueryOptions } from '../../hooks/query';

export type FtBalanceOfArgs = {
   account_id: string;
};
export type FtBalanceOfResult = string;

function useFtBalanceOf<Res = FtBalanceOfResult, Req extends FtBalanceOfArgs = FtBalanceOfArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>(FtCoreMethods.ft_balance_of, opts);
}

export default useFtBalanceOf;
