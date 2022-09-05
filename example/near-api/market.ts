import { useNearQuery, useNearMutation, useNearContract } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const MARKET_CONTRACT_NAME = 'mfight-market.testnet';

export enum MarketViewMethods {
  market_sale = 'market_sale',
  market_sales_by_nft_contract_id = 'market_sales_by_nft_contract_id',
  market_sales_by_owner_id = 'market_sales_by_owner_id',
  market_supply_by_nft_contract_id = 'market_supply_by_nft_contract_id',
  market_supply_by_owner_id = 'market_supply_by_owner_id',
  market_supply_sales = 'market_supply_sales',
  supported_ft_token_ids = 'supported_ft_token_ids',
  test = 'test',
}

export enum MarketChangeMethods {
  market_accept_offer = 'market_accept_offer',
  market_add_bid = 'market_add_bid',
  market_add_ft_token = 'market_add_ft_token',
  market_offer = 'market_offer', // payable
  market_process_purchase = 'market_process_purchase',
  market_remove_sale = 'market_remove_sale', // payable
  market_resolve_purchase = 'market_resolve_purchase',
  market_update_price = 'market_update_price', // payable
  nft_on_approve = 'nft_on_approve',
}

export function useMarketContract() {
  return (
    useNearContract(MARKET_CONTRACT_NAME, {
      viewMethods: [
        MarketViewMethods.market_sale,
        MarketViewMethods.market_sales_by_nft_contract_id,
        MarketViewMethods.market_sales_by_owner_id,
        MarketViewMethods.market_supply_by_nft_contract_id,
        MarketViewMethods.market_supply_by_owner_id,
        MarketViewMethods.market_supply_sales,
        MarketViewMethods.supported_ft_token_ids,
        MarketViewMethods.test,
      ],
      changeMethods: [
        MarketChangeMethods.market_accept_offer,
        MarketChangeMethods.market_add_bid,
        MarketChangeMethods.market_add_ft_token,
        MarketChangeMethods.market_offer,
        MarketChangeMethods.market_process_purchase,
        MarketChangeMethods.market_remove_sale,
        MarketChangeMethods.market_resolve_purchase,
        MarketChangeMethods.market_update_price,
        MarketChangeMethods.nft_on_approve,
      ],
    }
  ));
}

// market_accept_offer mutation

export type IMarketAcceptOfferArgs = {
  "nft_contract_id": "AccountId",
  "token_id": "string",
  "ft_token_id": "AccountId"
};

export type IMarketAcceptOfferResult = void;

export function useMarketAcceptOfferMutation(opts: NearMutationOptions<IMarketAcceptOfferResult, IMarketAcceptOfferArgs>) {
    return useNearMutation<IMarketAcceptOfferResult, IMarketAcceptOfferArgs>(MarketChangeMethods.market_accept_offer, opts);
}

// market_add_bid mutation

export type IMarketAddBidArgs = {
  "contract_and_token_id": "string",
  "amount": "integer",
  "ft_token_id": "AccountId",
  "buyer_id": "AccountId",
  "sale": "Sale"
};

export type IMarketAddBidResult = void;

export function useMarketAddBidMutation(opts: NearMutationOptions<IMarketAddBidResult, IMarketAddBidArgs>) {
    return useNearMutation<IMarketAddBidResult, IMarketAddBidArgs>(MarketChangeMethods.market_add_bid, opts);
}

// market_add_ft_token mutation

export type IMarketAddFtTokenArgs = {
  "nft_contract_id": "AccountId"
};

export type IMarketAddFtTokenResult = boolean;

export function useMarketAddFtTokenMutation(opts: NearMutationOptions<IMarketAddFtTokenResult, IMarketAddFtTokenArgs>) {
    return useNearMutation<IMarketAddFtTokenResult, IMarketAddFtTokenArgs>(MarketChangeMethods.market_add_ft_token, opts);
}

// market_offer mutation (payable)

export type IMarketOfferArgs = {
  "nft_contract_id": "AccountId",
  "token_id": "string"
};

export type IMarketOfferResult = void;

export function useMarketOfferMutation(opts: NearMutationOptions<IMarketOfferResult, IMarketOfferArgs>) {
    return useNearMutation<IMarketOfferResult, IMarketOfferArgs>(MarketChangeMethods.market_offer, opts);
}

// market_process_purchase mutation

export type IMarketProcessPurchaseArgs = {
  "nft_contract_id": "AccountId",
  "token_id": "string",
  "ft_token_id": "AccountId",
  "price": "U128",
  "buyer_id": "AccountId"
};

export type IMarketProcessPurchaseResult = Promise<void>;

export function useMarketProcessPurchaseMutation(opts: NearMutationOptions<IMarketProcessPurchaseResult, IMarketProcessPurchaseArgs>) {
    return useNearMutation<IMarketProcessPurchaseResult, IMarketProcessPurchaseArgs>(MarketChangeMethods.market_process_purchase, opts);
}

// market_remove_sale mutation (payable)

export type IMarketRemoveSaleArgs = {
  "nft_contract_id": "AccountId",
  "token_id": "string"
};

export type IMarketRemoveSaleResult = void;

export function useMarketRemoveSaleMutation(opts: NearMutationOptions<IMarketRemoveSaleResult, IMarketRemoveSaleArgs>) {
    return useNearMutation<IMarketRemoveSaleResult, IMarketRemoveSaleArgs>(MarketChangeMethods.market_remove_sale, opts);
}

// market_resolve_purchase mutation

export type IMarketResolvePurchaseArgs = {
  "ft_token_id": "AccountId",
  "buyer_id": "AccountId",
  "sale": "Sale",
  "price": "U128"
};

export type IMarketResolvePurchaseResult = U128;

export function useMarketResolvePurchaseMutation(opts: NearMutationOptions<IMarketResolvePurchaseResult, IMarketResolvePurchaseArgs>) {
    return useNearMutation<IMarketResolvePurchaseResult, IMarketResolvePurchaseArgs>(MarketChangeMethods.market_resolve_purchase, opts);
}

// market_sale query

export type IMarketSaleArgs = {
  "contract_id": "AccountId",
  "token_id": "string"
};

export type IMarketSaleResult = null;

export function useMarketSaleQuery(opts: NearQueryOptions<IMarketSaleResult, IMarketSaleArgs>) {
    return useNearQuery<IMarketSaleResult, IMarketSaleArgs>(MarketViewMethods.market_sale, opts);
}

// market_sales_by_nft_contract_id query

export type IMarketSalesByNftContractIdArgs = {
  "nft_contract_id": "AccountId",
  "from_index": "U64",
  "limit": "integer"
};

export type IMarketSalesByNftContractIdResult = Sale[];

export function useMarketSalesByNftContractIdQuery(opts: NearQueryOptions<IMarketSalesByNftContractIdResult, IMarketSalesByNftContractIdArgs>) {
    return useNearQuery<IMarketSalesByNftContractIdResult, IMarketSalesByNftContractIdArgs>(MarketViewMethods.market_sales_by_nft_contract_id, opts);
}

// market_sales_by_owner_id query

export type IMarketSalesByOwnerIdArgs = {
  "account_id": "AccountId",
  "from_index": "U64",
  "limit": "integer"
};

export type IMarketSalesByOwnerIdResult = Sale[];

export function useMarketSalesByOwnerIdQuery(opts: NearQueryOptions<IMarketSalesByOwnerIdResult, IMarketSalesByOwnerIdArgs>) {
    return useNearQuery<IMarketSalesByOwnerIdResult, IMarketSalesByOwnerIdArgs>(MarketViewMethods.market_sales_by_owner_id, opts);
}

// market_supply_by_nft_contract_id query

export type IMarketSupplyByNftContractIdArgs = {
  "nft_contract_id": "AccountId"
};

export type IMarketSupplyByNftContractIdResult = U64;

export function useMarketSupplyByNftContractIdQuery(opts: NearQueryOptions<IMarketSupplyByNftContractIdResult, IMarketSupplyByNftContractIdArgs>) {
    return useNearQuery<IMarketSupplyByNftContractIdResult, IMarketSupplyByNftContractIdArgs>(MarketViewMethods.market_supply_by_nft_contract_id, opts);
}

// market_supply_by_owner_id query

export type IMarketSupplyByOwnerIdArgs = {
  "account_id": "AccountId"
};

export type IMarketSupplyByOwnerIdResult = U64;

export function useMarketSupplyByOwnerIdQuery(opts: NearQueryOptions<IMarketSupplyByOwnerIdResult, IMarketSupplyByOwnerIdArgs>) {
    return useNearQuery<IMarketSupplyByOwnerIdResult, IMarketSupplyByOwnerIdArgs>(MarketViewMethods.market_supply_by_owner_id, opts);
}

// market_supply_sales query

export type IMarketSupplySalesArgs = {};

export type IMarketSupplySalesResult = U64;

export function useMarketSupplySalesQuery(opts: NearQueryOptions<IMarketSupplySalesResult, IMarketSupplySalesArgs>) {
    return useNearQuery<IMarketSupplySalesResult, IMarketSupplySalesArgs>(MarketViewMethods.market_supply_sales, opts);
}

// market_update_price mutation (payable)

export type IMarketUpdatePriceArgs = {
  "nft_contract_id": "AccountId",
  "token_id": "string",
  "ft_token_id": "AccountId",
  "price": "U128"
};

export type IMarketUpdatePriceResult = void;

export function useMarketUpdatePriceMutation(opts: NearMutationOptions<IMarketUpdatePriceResult, IMarketUpdatePriceArgs>) {
    return useNearMutation<IMarketUpdatePriceResult, IMarketUpdatePriceArgs>(MarketChangeMethods.market_update_price, opts);
}

// nft_on_approve mutation

export type INftOnApproveArgs = {
  "token_id": "string",
  "owner_id": "AccountId",
  "approval_id": "integer",
  "msg": "string"
};

export type INftOnApproveResult = void;

export function useNftOnApproveMutation(opts: NearMutationOptions<INftOnApproveResult, INftOnApproveArgs>) {
    return useNearMutation<INftOnApproveResult, INftOnApproveArgs>(MarketChangeMethods.nft_on_approve, opts);
}

// supported_ft_token_ids query

export type ISupportedFtTokenIdsArgs = {};

export type ISupportedFtTokenIdsResult = AccountId[];

export function useSupportedFtTokenIdsQuery(opts: NearQueryOptions<ISupportedFtTokenIdsResult, ISupportedFtTokenIdsArgs>) {
    return useNearQuery<ISupportedFtTokenIdsResult, ISupportedFtTokenIdsArgs>(MarketViewMethods.supported_ft_token_ids, opts);
}

// test query

export type ITestArgs = {
  "account_id": "AccountId"
};

export type ITestResult = string[];

export function useTestQuery(opts: NearQueryOptions<ITestResult, ITestArgs>) {
    return useNearQuery<ITestResult, ITestArgs>(MarketViewMethods.test, opts);
}

/**
 * Account identifier. This is the human readable utf8 string which is used internally to index accounts on the network and their respective state.
 *
 * Because these IDs have to be validated, they have to be converted from a string with [`FromStr`] or [`TryFrom`] a compatible type. To skip validation on initialization, [`AccountId::new_unchecked`] can be used.
 *
 * # Examples ``` use near_sdk::AccountId; use std::convert::{TryFrom, TryInto};
 *
 * // `FromStr` conversion let alice: AccountId = "alice.near".parse().unwrap(); assert!("invalid.".parse::<AccountId>().is_err());
 *
 * let alice_string = "alice".to_string();
 *
 * // From string with validation let alice = AccountId::try_from(alice_string.clone()).unwrap(); let alice: AccountId = alice_string.try_into().unwrap();
 *
 * // Initialize without validating let alice_unchecked = AccountId::new_unchecked("alice".to_string()); assert_eq!(alice, alice_unchecked); ```
 *
 * [`FromStr`]: std::str::FromStr
 */
export type AccountId = string;
export type U128 = number;
export type PromiseOrValueU128 = number;
export type U64 = number;

export interface Definitions {
  AccountId?: AccountId;
  Bid?: Bid;
  Promise?: true;
  PromiseOrValueU128?: PromiseOrValueU128;
  Sale?: Sale;
  U128?: U128;
  U64?: U64;
}
export interface Bid {
  owner_id: AccountId;
  price: U128;
}
export interface Sale {
  approval_id: number;
  bids: {
    [k: string]: Bid[];
  };
  created_at: number;
  is_auction: boolean;
  nft_contract_id: AccountId;
  owner_id: AccountId;
  sale_conditions: {
    [k: string]: U128;
  };
  token_id: string;
}
