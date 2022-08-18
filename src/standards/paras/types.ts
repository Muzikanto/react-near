import { NearViewMethod } from '../../types';
import { ParasMarketDataArgs, ParasMarketDataResult } from './useParasMarketData';
import { NearContract } from '../../contract/useNearContract';

export type ParasBid = {
   bidder_id: string;
   price: string;
};

export type ParasMarketData = {
   owner_id: string;
   approval_id: string;
   nft_contract_id: string;
   token_id: string;
   ft_token_id: string; // "near" for NEAR token
   price: string;
   bids?: ParasBid[];
   started_at?: string;
   ended_at?: string;
   end_price?: string;
   is_auction?: boolean;
   transaction_fee: string;
};

export type ParasCollectionStats = {
   floor_price?: string;
   total_card_sale?: number;
   total_card_not_sale?: number;
   avg_price?: string;
   avg_price_usd?: number;
   collection_id?: string;
   owner_ids?: string[];
   total_cards?: number;
   total_owners?: number;
   total_sales?: number;
   volume?: string;
   volume_usd?: number;
   _id?: string;
};

export type ParasContract = NearContract<{
   get_market_data: NearViewMethod<ParasMarketDataArgs, ParasMarketDataResult>;
}>;
