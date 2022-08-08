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
