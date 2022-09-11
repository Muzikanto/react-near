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
}

export interface IMarketContract {
   // view methods
   market_sale(args: IMarketSaleArgs): IMarketSaleResult
   market_sales_by_nft_contract_id(args: IMarketSalesByNftContractIdArgs): IMarketSalesByNftContractIdResult
   market_sales_by_owner_id(args: IMarketSalesByOwnerIdArgs): IMarketSalesByOwnerIdResult
   market_supply_by_nft_contract_id(args: IMarketSupplyByNftContractIdArgs): IMarketSupplyByNftContractIdResult
   market_supply_by_owner_id(args: IMarketSupplyByOwnerIdArgs): IMarketSupplyByOwnerIdResult
   market_supply_sales(args: IMarketSupplySalesArgs): IMarketSupplySalesResult
   supported_ft_token_ids(args: ISupportedFtTokenIdsArgs): ISupportedFtTokenIdsResult
   // change methods
   market_accept_offer(args: IMarketAcceptOfferArgs): IMarketAcceptOfferResult
   market_add_bid(args: IMarketAddBidArgs): IMarketAddBidResult
   market_add_ft_token(args: IMarketAddFtTokenArgs): IMarketAddFtTokenResult
   market_offer(args: IMarketOfferArgs): IMarketOfferResult
   market_process_purchase(args: IMarketProcessPurchaseArgs): IMarketProcessPurchaseResult
   market_remove_sale(args: IMarketRemoveSaleArgs): IMarketRemoveSaleResult
   market_resolve_purchase(args: IMarketResolvePurchaseArgs): IMarketResolvePurchaseResult
   market_update_price(args: IMarketUpdatePriceArgs): IMarketUpdatePriceResult
}

export function useMarketContract() {
  return (
    useNearContract<IMarketContract>(MARKET_CONTRACT_NAME, {
      viewMethods: [
        MarketViewMethods.market_sale,
        MarketViewMethods.market_sales_by_nft_contract_id,
        MarketViewMethods.market_sales_by_owner_id,
        MarketViewMethods.market_supply_by_nft_contract_id,
        MarketViewMethods.market_supply_by_owner_id,
        MarketViewMethods.market_supply_sales,
        MarketViewMethods.supported_ft_token_ids,
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
      ],
    }
  ));
}

export function useMarketQueryRaw<Res = any, Req = any>(
  methodName: MarketViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = useMarketContract();

  return useNearQuery(methodName, { contract, ...opts });
}

export function useMarketMutationRaw<Res = any, Req = any>(
  methodName: MarketChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = useMarketContract();

  return useNearMutation(methodName, { contract, ...opts });
}

// market_accept_offer mutation

export type IMarketAcceptOfferArgs = {
   nft_contract_id: AccountId;
   token_id: string;
   ft_token_id: AccountId;
};

export type IMarketAcceptOfferResult = void;

export function useMarketAcceptOfferMutation(opts: NearMutationOptions<IMarketAcceptOfferResult, IMarketAcceptOfferArgs>) {
    return useMarketMutationRaw<IMarketAcceptOfferResult, IMarketAcceptOfferArgs>(MarketChangeMethods.market_accept_offer, opts);
}

// market_add_bid mutation

export type IMarketAddBidArgs = {
   contract_and_token_id: string;
   amount: integer;
   ft_token_id: AccountId;
   buyer_id: AccountId;
   sale: Sale;
};

export type IMarketAddBidResult = void;

export function useMarketAddBidMutation(opts: NearMutationOptions<IMarketAddBidResult, IMarketAddBidArgs>) {
    return useMarketMutationRaw<IMarketAddBidResult, IMarketAddBidArgs>(MarketChangeMethods.market_add_bid, opts);
}

// market_add_ft_token mutation

export type IMarketAddFtTokenArgs = {
   nft_contract_id: AccountId;
};

export type IMarketAddFtTokenResult = boolean;

export function useMarketAddFtTokenMutation(opts: NearMutationOptions<IMarketAddFtTokenResult, IMarketAddFtTokenArgs>) {
    return useMarketMutationRaw<IMarketAddFtTokenResult, IMarketAddFtTokenArgs>(MarketChangeMethods.market_add_ft_token, opts);
}

// market_offer mutation (payable)

export type IMarketOfferArgs = {
   nft_contract_id: AccountId;
   token_id: string;
};

export type IMarketOfferResult = void;

export function useMarketOfferMutation(opts: NearMutationOptions<IMarketOfferResult, IMarketOfferArgs>) {
    return useMarketMutationRaw<IMarketOfferResult, IMarketOfferArgs>(MarketChangeMethods.market_offer, opts);
}

// market_process_purchase mutation

export type IMarketProcessPurchaseArgs = {
   nft_contract_id: AccountId;
   token_id: string;
   ft_token_id: AccountId;
   price: U128;
   buyer_id: AccountId;
};

export type IMarketProcessPurchaseResult = void;

export function useMarketProcessPurchaseMutation(opts: NearMutationOptions<IMarketProcessPurchaseResult, IMarketProcessPurchaseArgs>) {
    return useMarketMutationRaw<IMarketProcessPurchaseResult, IMarketProcessPurchaseArgs>(MarketChangeMethods.market_process_purchase, opts);
}

// market_remove_sale mutation (payable)

export type IMarketRemoveSaleArgs = {
   nft_contract_id: AccountId;
   token_id: string;
};

export type IMarketRemoveSaleResult = void;

export function useMarketRemoveSaleMutation(opts: NearMutationOptions<IMarketRemoveSaleResult, IMarketRemoveSaleArgs>) {
    return useMarketMutationRaw<IMarketRemoveSaleResult, IMarketRemoveSaleArgs>(MarketChangeMethods.market_remove_sale, opts);
}

// market_resolve_purchase mutation

export type IMarketResolvePurchaseArgs = {
   ft_token_id: AccountId;
   buyer_id: AccountId;
   sale: Sale;
   price: U128;
};

export type IMarketResolvePurchaseResult = U128;

export function useMarketResolvePurchaseMutation(opts: NearMutationOptions<IMarketResolvePurchaseResult, IMarketResolvePurchaseArgs>) {
    return useMarketMutationRaw<IMarketResolvePurchaseResult, IMarketResolvePurchaseArgs>(MarketChangeMethods.market_resolve_purchase, opts);
}

// market_sale query

export type IMarketSaleArgs = {
   contract_id: AccountId;
   token_id: string;
};

export type IMarketSaleResult = Sale | null;

export function useMarketSaleQuery(opts: NearQueryOptions<IMarketSaleResult, IMarketSaleArgs>) {
    return useMarketQueryRaw<IMarketSaleResult, IMarketSaleArgs>(MarketViewMethods.market_sale, opts);
}

// market_sales_by_nft_contract_id query

export type IMarketSalesByNftContractIdArgs = {
   nft_contract_id: AccountId;
   from_index: U64;
   limit: integer;
};

export type IMarketSalesByNftContractIdResult = Sale[];

export function useMarketSalesByNftContractIdQuery(opts: NearQueryOptions<IMarketSalesByNftContractIdResult, IMarketSalesByNftContractIdArgs>) {
    return useMarketQueryRaw<IMarketSalesByNftContractIdResult, IMarketSalesByNftContractIdArgs>(MarketViewMethods.market_sales_by_nft_contract_id, opts);
}

// market_sales_by_owner_id query

export type IMarketSalesByOwnerIdArgs = {
   account_id: AccountId;
   from_index: U64;
   limit: integer;
};

export type IMarketSalesByOwnerIdResult = Sale[];

export function useMarketSalesByOwnerIdQuery(opts: NearQueryOptions<IMarketSalesByOwnerIdResult, IMarketSalesByOwnerIdArgs>) {
    return useMarketQueryRaw<IMarketSalesByOwnerIdResult, IMarketSalesByOwnerIdArgs>(MarketViewMethods.market_sales_by_owner_id, opts);
}

// market_supply_by_nft_contract_id query

export type IMarketSupplyByNftContractIdArgs = {
   nft_contract_id: AccountId;
};

export type IMarketSupplyByNftContractIdResult = U64;

export function useMarketSupplyByNftContractIdQuery(opts: NearQueryOptions<IMarketSupplyByNftContractIdResult, IMarketSupplyByNftContractIdArgs>) {
    return useMarketQueryRaw<IMarketSupplyByNftContractIdResult, IMarketSupplyByNftContractIdArgs>(MarketViewMethods.market_supply_by_nft_contract_id, opts);
}

// market_supply_by_owner_id query

export type IMarketSupplyByOwnerIdArgs = {
   account_id: AccountId;
};

export type IMarketSupplyByOwnerIdResult = U64;

export function useMarketSupplyByOwnerIdQuery(opts: NearQueryOptions<IMarketSupplyByOwnerIdResult, IMarketSupplyByOwnerIdArgs>) {
    return useMarketQueryRaw<IMarketSupplyByOwnerIdResult, IMarketSupplyByOwnerIdArgs>(MarketViewMethods.market_supply_by_owner_id, opts);
}

// market_supply_sales query

export type IMarketSupplySalesArgs = {

};

export type IMarketSupplySalesResult = U64;

export function useMarketSupplySalesQuery(opts: NearQueryOptions<IMarketSupplySalesResult, IMarketSupplySalesArgs>) {
    return useMarketQueryRaw<IMarketSupplySalesResult, IMarketSupplySalesArgs>(MarketViewMethods.market_supply_sales, opts);
}

// market_update_price mutation (payable)

export type IMarketUpdatePriceArgs = {
   nft_contract_id: AccountId;
   token_id: string;
   ft_token_id: AccountId;
   price: U128;
};

export type IMarketUpdatePriceResult = void;

export function useMarketUpdatePriceMutation(opts: NearMutationOptions<IMarketUpdatePriceResult, IMarketUpdatePriceArgs>) {
    return useMarketMutationRaw<IMarketUpdatePriceResult, IMarketUpdatePriceArgs>(MarketChangeMethods.market_update_price, opts);
}

// supported_ft_token_ids query

export type ISupportedFtTokenIdsArgs = {

};

export type ISupportedFtTokenIdsResult = AccountId[];

export function useSupportedFtTokenIdsQuery(opts: NearQueryOptions<ISupportedFtTokenIdsResult, ISupportedFtTokenIdsArgs>) {
    return useMarketQueryRaw<ISupportedFtTokenIdsResult, ISupportedFtTokenIdsArgs>(MarketViewMethods.supported_ft_token_ids, opts);
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
export type U128 = string;
export type PromiseOrValueString = string;
export type PromiseOrValueU128 = string;
export type U64 = string;

export interface Definitions {
  AccountId?: AccountId;
  Bid?: Bid;
  Promise?: true;
  PromiseOrValueString?: PromiseOrValueString;
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

type integer = number;