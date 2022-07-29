import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { MtCoreMethods } from './methods';

export type MtBalanceOfArgs = {
   account_id: string;
   token_id: string;
};
export type MtBalanceOfResult = string;

function useMtBalanceOf<Res = MtBalanceOfResult, Req extends MtBalanceOfArgs = MtBalanceOfArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>(MtCoreMethods.mt_balance_of, opts);
}

export default useMtBalanceOf;
