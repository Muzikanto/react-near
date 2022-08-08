import { ParasMarketData } from './types';
import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { ParasMethods } from './methods';

export type ParasMarketDataArgs = {
   token_id: string;
   nft_contract_id: string;
};
export type ParasMarketDataResult = ParasMarketData;

function useParasMarketData<
   Res = ParasMarketDataResult,
   Req extends ParasMarketDataArgs = ParasMarketDataArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(ParasMethods.get_market_data, opts);
}

export default useParasMarketData;
