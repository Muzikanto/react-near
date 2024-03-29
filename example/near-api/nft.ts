// Code is generated by react-near

import { useNearQuery, useNearMutation, useNearEnv, NearEnvironment } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const NFT_CONTRACT_NAME_MAINNET = 'mfight-nft.near';
export const NFT_CONTRACT_NAME_TESTNET = 'mfight-nft_v2.testnet';

export enum NftViewMethods {
  assert_action = 'assert_action',
  assert_owner = 'assert_owner',
  is_blacklist = 'is_blacklist',
  is_paused = 'is_paused',
  nft_burner_upgrade_price = 'nft_burner_upgrade_price',
  nft_is_approved = 'nft_is_approved',
  nft_is_bind_to_owner = 'nft_is_bind_to_owner',
  nft_metadata = 'nft_metadata',
  nft_payout = 'nft_payout',
  nft_royalty_account = 'nft_royalty_account',
  nft_royalty_value = 'nft_royalty_value',
  nft_supply_for_owner = 'nft_supply_for_owner',
  nft_token = 'nft_token',
  nft_tokens = 'nft_tokens',
  nft_tokens_by_ids = 'nft_tokens_by_ids',
  nft_tokens_for_owner = 'nft_tokens_for_owner',
  nft_total_supply = 'nft_total_supply',
  nft_upgrade_price = 'nft_upgrade_price',
}

export enum NftChangeMethods {
  blacklist_add = 'blacklist_add',
  blacklist_remove = 'blacklist_remove',
  nft_approve = 'nft_approve', // payable
  nft_burn = 'nft_burn', // payable
  nft_burner_upgrade = 'nft_burner_upgrade',
  nft_mint = 'nft_mint',
  nft_remove_burner_upgrade_price = 'nft_remove_burner_upgrade_price',
  nft_remove_upgrade_price = 'nft_remove_upgrade_price',
  nft_resolve_transfer = 'nft_resolve_transfer',
  nft_reveal = 'nft_reveal', // payable
  nft_revoke = 'nft_revoke', // payable
  nft_revoke_all = 'nft_revoke_all', // payable
  nft_set_burner_upgrade_price = 'nft_set_burner_upgrade_price',
  nft_set_upgrade_price = 'nft_set_upgrade_price',
  nft_transfer = 'nft_transfer', // payable
  nft_transfer_call = 'nft_transfer_call', // payable
  nft_transfer_payout = 'nft_transfer_payout', // payable
  nft_upgrade = 'nft_upgrade', // payable
  set_is_paused = 'set_is_paused',
  set_royalty_account = 'set_royalty_account',
  set_royalty_value = 'set_royalty_value',
}

export interface INftContract {
   // view methods
   assert_action(args: IAssertActionArgs): IAssertActionResult
   assert_owner(args: IAssertOwnerArgs): IAssertOwnerResult
   is_blacklist(args: IIsBlacklistArgs): IIsBlacklistResult
   is_paused(args: IIsPausedArgs): IIsPausedResult
   nft_burner_upgrade_price(args: INftBurnerUpgradePriceArgs): INftBurnerUpgradePriceResult
   nft_is_approved(args: INftIsApprovedArgs): INftIsApprovedResult
   nft_is_bind_to_owner(args: INftIsBindToOwnerArgs): INftIsBindToOwnerResult
   nft_metadata(args: INftMetadataArgs): INftMetadataResult
   nft_payout(args: INftPayoutArgs): INftPayoutResult
   nft_royalty_account(args: INftRoyaltyAccountArgs): INftRoyaltyAccountResult
   nft_royalty_value(args: INftRoyaltyValueArgs): INftRoyaltyValueResult
   nft_supply_for_owner(args: INftSupplyForOwnerArgs): INftSupplyForOwnerResult
   nft_token(args: INftTokenArgs): INftTokenResult
   nft_tokens(args: INftTokensArgs): INftTokensResult
   nft_tokens_by_ids(args: INftTokensByIdsArgs): INftTokensByIdsResult
   nft_tokens_for_owner(args: INftTokensForOwnerArgs): INftTokensForOwnerResult
   nft_total_supply(args: INftTotalSupplyArgs): INftTotalSupplyResult
   nft_upgrade_price(args: INftUpgradePriceArgs): INftUpgradePriceResult
   // change methods
   blacklist_add(args: IBlacklistAddArgs): IBlacklistAddResult
   blacklist_remove(args: IBlacklistRemoveArgs): IBlacklistRemoveResult
   nft_approve(args: INftApproveArgs): INftApproveResult
   nft_burn(args: INftBurnArgs): INftBurnResult
   nft_burner_upgrade(args: INftBurnerUpgradeArgs): INftBurnerUpgradeResult
   nft_mint(args: INftMintArgs): INftMintResult
   nft_remove_burner_upgrade_price(args: INftRemoveBurnerUpgradePriceArgs): INftRemoveBurnerUpgradePriceResult
   nft_remove_upgrade_price(args: INftRemoveUpgradePriceArgs): INftRemoveUpgradePriceResult
   nft_resolve_transfer(args: INftResolveTransferArgs): INftResolveTransferResult
   nft_reveal(args: INftRevealArgs): INftRevealResult
   nft_revoke(args: INftRevokeArgs): INftRevokeResult
   nft_revoke_all(args: INftRevokeAllArgs): INftRevokeAllResult
   nft_set_burner_upgrade_price(args: INftSetBurnerUpgradePriceArgs): INftSetBurnerUpgradePriceResult
   nft_set_upgrade_price(args: INftSetUpgradePriceArgs): INftSetUpgradePriceResult
   nft_transfer(args: INftTransferArgs): INftTransferResult
   nft_transfer_call(args: INftTransferCallArgs): INftTransferCallResult
   nft_transfer_payout(args: INftTransferPayoutArgs): INftTransferPayoutResult
   nft_upgrade(args: INftUpgradeArgs): INftUpgradeResult
   set_is_paused(args: ISetIsPausedArgs): ISetIsPausedResult
   set_royalty_account(args: ISetRoyaltyAccountArgs): ISetRoyaltyAccountResult
   set_royalty_value(args: ISetRoyaltyValueArgs): ISetRoyaltyValueResult
}

export function useNftContractId() {
  const nearEnv = useNearEnv();

  return nearEnv.value === NearEnvironment.MainNet ? NFT_CONTRACT_NAME_MAINNET : NFT_CONTRACT_NAME_TESTNET;
}


export function useNftQueryRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: NftViewMethods,
  opts: Omit<NearQueryOptions<Res, Req>, 'contract'> = {}
) {
  const contract = useNftContractId();
  return useNearQuery(methodName, { contract, ...opts });
}
export function useNftMutationRaw<Res = any, Req extends { [key: string]: any } = any>(
  methodName: NftChangeMethods,
  opts: Omit<NearMutationOptions<Res, Req>, 'contract'> = {}
) {
  const contract = useNftContractId();
  return useNearMutation(methodName, { contract, ...opts });
}

// assert_action query

export type IAssertActionArgs = {

};

export type IAssertActionResult = void;

export function useAssertActionQuery(opts: Omit<NearQueryOptions<IAssertActionResult, IAssertActionArgs>, 'contract'>) {
    return useNftQueryRaw<IAssertActionResult, IAssertActionArgs>(NftViewMethods.assert_action, opts);
}

// assert_owner query

export type IAssertOwnerArgs = {

};

export type IAssertOwnerResult = void;

export function useAssertOwnerQuery(opts: Omit<NearQueryOptions<IAssertOwnerResult, IAssertOwnerArgs>, 'contract'>) {
    return useNftQueryRaw<IAssertOwnerResult, IAssertOwnerArgs>(NftViewMethods.assert_owner, opts);
}

// blacklist_add mutation

export type IBlacklistAddArgs = {
   account_id: AccountId;
};

export type IBlacklistAddResult = boolean;

export function useBlacklistAddMutation(opts: Omit<NearMutationOptions<IBlacklistAddResult, IBlacklistAddArgs>, 'contract'>) {
    return useNftMutationRaw<IBlacklistAddResult, IBlacklistAddArgs>(NftChangeMethods.blacklist_add, opts);
}

// blacklist_remove mutation

export type IBlacklistRemoveArgs = {
   account_id: AccountId;
};

export type IBlacklistRemoveResult = boolean;

export function useBlacklistRemoveMutation(opts: Omit<NearMutationOptions<IBlacklistRemoveResult, IBlacklistRemoveArgs>, 'contract'>) {
    return useNftMutationRaw<IBlacklistRemoveResult, IBlacklistRemoveArgs>(NftChangeMethods.blacklist_remove, opts);
}

// is_blacklist query

export type IIsBlacklistArgs = {
   account_id: AccountId;
};

export type IIsBlacklistResult = boolean;

export function useIsBlacklistQuery(opts: Omit<NearQueryOptions<IIsBlacklistResult, IIsBlacklistArgs>, 'contract'>) {
    return useNftQueryRaw<IIsBlacklistResult, IIsBlacklistArgs>(NftViewMethods.is_blacklist, opts);
}

// is_paused query

export type IIsPausedArgs = {

};

export type IIsPausedResult = boolean;

export function useIsPausedQuery(opts: Omit<NearQueryOptions<IIsPausedResult, IIsPausedArgs>, 'contract'>) {
    return useNftQueryRaw<IIsPausedResult, IIsPausedArgs>(NftViewMethods.is_paused, opts);
}

// nft_approve mutation (payable)

export type INftApproveArgs = {
   token_id: string;
   account_id: AccountId;
   msg: string | null;
};

export type INftApproveResult = void | null;

export function useNftApproveMutation(opts: Omit<NearMutationOptions<INftApproveResult, INftApproveArgs>, 'contract'>) {
    return useNftMutationRaw<INftApproveResult, INftApproveArgs>(NftChangeMethods.nft_approve, opts);
}

// nft_burn mutation (payable)

export type INftBurnArgs = {
   token_id: string;
};

export type INftBurnResult = void;

export function useNftBurnMutation(opts: Omit<NearMutationOptions<INftBurnResult, INftBurnArgs>, 'contract'>) {
    return useNftMutationRaw<INftBurnResult, INftBurnArgs>(NftChangeMethods.nft_burn, opts);
}

// nft_burner_upgrade mutation

export type INftBurnerUpgradeArgs = {
   token_id: string;
   burning_tokens: string[];
};

export type INftBurnerUpgradeResult = void;

export function useNftBurnerUpgradeMutation(opts: Omit<NearMutationOptions<INftBurnerUpgradeResult, INftBurnerUpgradeArgs>, 'contract'>) {
    return useNftMutationRaw<INftBurnerUpgradeResult, INftBurnerUpgradeArgs>(NftChangeMethods.nft_burner_upgrade, opts);
}

// nft_burner_upgrade_price query

export type INftBurnerUpgradePriceArgs = {
   token_id: string;
};

export type INftBurnerUpgradePriceResult = integer | null;

export function useNftBurnerUpgradePriceQuery(opts: Omit<NearQueryOptions<INftBurnerUpgradePriceResult, INftBurnerUpgradePriceArgs>, 'contract'>) {
    return useNftQueryRaw<INftBurnerUpgradePriceResult, INftBurnerUpgradePriceArgs>(NftViewMethods.nft_burner_upgrade_price, opts);
}

// nft_is_approved query

export type INftIsApprovedArgs = {
   token_id: string;
   approved_account_id: AccountId;
   approval_id: integer | null;
};

export type INftIsApprovedResult = boolean;

export function useNftIsApprovedQuery(opts: Omit<NearQueryOptions<INftIsApprovedResult, INftIsApprovedArgs>, 'contract'>) {
    return useNftQueryRaw<INftIsApprovedResult, INftIsApprovedArgs>(NftViewMethods.nft_is_approved, opts);
}

// nft_is_bind_to_owner query

export type INftIsBindToOwnerArgs = {
   token_id: string;
};

export type INftIsBindToOwnerResult = boolean;

export function useNftIsBindToOwnerQuery(opts: Omit<NearQueryOptions<INftIsBindToOwnerResult, INftIsBindToOwnerArgs>, 'contract'>) {
    return useNftQueryRaw<INftIsBindToOwnerResult, INftIsBindToOwnerArgs>(NftViewMethods.nft_is_bind_to_owner, opts);
}

// nft_metadata query

export type INftMetadataArgs = {

};

export type INftMetadataResult = NFTContractMetadata;

export function useNftMetadataQuery(opts: Omit<NearQueryOptions<INftMetadataResult, INftMetadataArgs>, 'contract'>) {
    return useNftQueryRaw<INftMetadataResult, INftMetadataArgs>(NftViewMethods.nft_metadata, opts);
}

// nft_mint mutation

export type INftMintArgs = {
   token_id: string;
   receiver_id: AccountId | null;
   token_metadata: TokenMetadata;
   bind_to_owner: boolean | null;
   perpetual_royalties: object | null;
   reveal_at: integer | null;
   rarity: integer | null;
   collection: string | null;
   token_type: string | null;
   token_sub_type: string | null;
};

export type INftMintResult = Token;

export function useNftMintMutation(opts: Omit<NearMutationOptions<INftMintResult, INftMintArgs>, 'contract'>) {
    return useNftMutationRaw<INftMintResult, INftMintArgs>(NftChangeMethods.nft_mint, opts);
}

// nft_payout query

export type INftPayoutArgs = {
   token_id: string;
   balance: U128;
   max_len_payout: integer;
};

export type INftPayoutResult = Payout;

export function useNftPayoutQuery(opts: Omit<NearQueryOptions<INftPayoutResult, INftPayoutArgs>, 'contract'>) {
    return useNftQueryRaw<INftPayoutResult, INftPayoutArgs>(NftViewMethods.nft_payout, opts);
}

// nft_remove_burner_upgrade_price mutation

export type INftRemoveBurnerUpgradePriceArgs = {
   types: object | null;
   rarity: integer;
};

export type INftRemoveBurnerUpgradePriceResult = void;

export function useNftRemoveBurnerUpgradePriceMutation(opts: Omit<NearMutationOptions<INftRemoveBurnerUpgradePriceResult, INftRemoveBurnerUpgradePriceArgs>, 'contract'>) {
    return useNftMutationRaw<INftRemoveBurnerUpgradePriceResult, INftRemoveBurnerUpgradePriceArgs>(NftChangeMethods.nft_remove_burner_upgrade_price, opts);
}

// nft_remove_upgrade_price mutation

export type INftRemoveUpgradePriceArgs = {
   types: object | null;
   rarity: integer;
};

export type INftRemoveUpgradePriceResult = void;

export function useNftRemoveUpgradePriceMutation(opts: Omit<NearMutationOptions<INftRemoveUpgradePriceResult, INftRemoveUpgradePriceArgs>, 'contract'>) {
    return useNftMutationRaw<INftRemoveUpgradePriceResult, INftRemoveUpgradePriceArgs>(NftChangeMethods.nft_remove_upgrade_price, opts);
}

// nft_resolve_transfer mutation

export type INftResolveTransferArgs = {
   previous_owner_id: AccountId;
   receiver_id: AccountId;
   token_id: string;
   approved_account_ids: object | null;
};

export type INftResolveTransferResult = boolean;

export function useNftResolveTransferMutation(opts: Omit<NearMutationOptions<INftResolveTransferResult, INftResolveTransferArgs>, 'contract'>) {
    return useNftMutationRaw<INftResolveTransferResult, INftResolveTransferArgs>(NftChangeMethods.nft_resolve_transfer, opts);
}

// nft_reveal mutation (payable)

export type INftRevealArgs = {
   token_id: string;
};

export type INftRevealResult = void;

export function useNftRevealMutation(opts: Omit<NearMutationOptions<INftRevealResult, INftRevealArgs>, 'contract'>) {
    return useNftMutationRaw<INftRevealResult, INftRevealArgs>(NftChangeMethods.nft_reveal, opts);
}

// nft_revoke mutation (payable)

export type INftRevokeArgs = {
   token_id: string;
   account_id: AccountId;
};

export type INftRevokeResult = void;

export function useNftRevokeMutation(opts: Omit<NearMutationOptions<INftRevokeResult, INftRevokeArgs>, 'contract'>) {
    return useNftMutationRaw<INftRevokeResult, INftRevokeArgs>(NftChangeMethods.nft_revoke, opts);
}

// nft_revoke_all mutation (payable)

export type INftRevokeAllArgs = {
   token_id: string;
};

export type INftRevokeAllResult = void;

export function useNftRevokeAllMutation(opts: Omit<NearMutationOptions<INftRevokeAllResult, INftRevokeAllArgs>, 'contract'>) {
    return useNftMutationRaw<INftRevokeAllResult, INftRevokeAllArgs>(NftChangeMethods.nft_revoke_all, opts);
}

// nft_royalty_account query

export type INftRoyaltyAccountArgs = {

};

export type INftRoyaltyAccountResult = AccountId;

export function useNftRoyaltyAccountQuery(opts: Omit<NearQueryOptions<INftRoyaltyAccountResult, INftRoyaltyAccountArgs>, 'contract'>) {
    return useNftQueryRaw<INftRoyaltyAccountResult, INftRoyaltyAccountArgs>(NftViewMethods.nft_royalty_account, opts);
}

// nft_royalty_value query

export type INftRoyaltyValueArgs = {

};

export type INftRoyaltyValueResult = integer;

export function useNftRoyaltyValueQuery(opts: Omit<NearQueryOptions<INftRoyaltyValueResult, INftRoyaltyValueArgs>, 'contract'>) {
    return useNftQueryRaw<INftRoyaltyValueResult, INftRoyaltyValueArgs>(NftViewMethods.nft_royalty_value, opts);
}

// nft_set_burner_upgrade_price mutation

export type INftSetBurnerUpgradePriceArgs = {
   types: object | null;
   rarity: integer;
   burning_rarity_sum: integer;
};

export type INftSetBurnerUpgradePriceResult = void;

export function useNftSetBurnerUpgradePriceMutation(opts: Omit<NearMutationOptions<INftSetBurnerUpgradePriceResult, INftSetBurnerUpgradePriceArgs>, 'contract'>) {
    return useNftMutationRaw<INftSetBurnerUpgradePriceResult, INftSetBurnerUpgradePriceArgs>(NftChangeMethods.nft_set_burner_upgrade_price, opts);
}

// nft_set_upgrade_price mutation

export type INftSetUpgradePriceArgs = {
   types: object | null;
   rarity: integer;
   ft_token_id: AccountId;
   price: U128;
};

export type INftSetUpgradePriceResult = void;

export function useNftSetUpgradePriceMutation(opts: Omit<NearMutationOptions<INftSetUpgradePriceResult, INftSetUpgradePriceArgs>, 'contract'>) {
    return useNftMutationRaw<INftSetUpgradePriceResult, INftSetUpgradePriceArgs>(NftChangeMethods.nft_set_upgrade_price, opts);
}

// nft_supply_for_owner query

export type INftSupplyForOwnerArgs = {
   account_id: AccountId;
};

export type INftSupplyForOwnerResult = U128;

export function useNftSupplyForOwnerQuery(opts: Omit<NearQueryOptions<INftSupplyForOwnerResult, INftSupplyForOwnerArgs>, 'contract'>) {
    return useNftQueryRaw<INftSupplyForOwnerResult, INftSupplyForOwnerArgs>(NftViewMethods.nft_supply_for_owner, opts);
}

// nft_token query

export type INftTokenArgs = {
   token_id: string;
};

export type INftTokenResult = Token | null;

export function useNftTokenQuery(opts: Omit<NearQueryOptions<INftTokenResult, INftTokenArgs>, 'contract'>) {
    return useNftQueryRaw<INftTokenResult, INftTokenArgs>(NftViewMethods.nft_token, opts);
}

// nft_tokens query

export type INftTokensArgs = {
   from_index: U128 | null;
   limit: integer | null;
};

export type INftTokensResult = Token[];

export function useNftTokensQuery(opts: Omit<NearQueryOptions<INftTokensResult, INftTokensArgs>, 'contract'>) {
    return useNftQueryRaw<INftTokensResult, INftTokensArgs>(NftViewMethods.nft_tokens, opts);
}

// nft_tokens_by_ids query

export type INftTokensByIdsArgs = {
   ids: string[];
};

export type INftTokensByIdsResult = Token[];

export function useNftTokensByIdsQuery(opts: Omit<NearQueryOptions<INftTokensByIdsResult, INftTokensByIdsArgs>, 'contract'>) {
    return useNftQueryRaw<INftTokensByIdsResult, INftTokensByIdsArgs>(NftViewMethods.nft_tokens_by_ids, opts);
}

// nft_tokens_for_owner query

export type INftTokensForOwnerArgs = {
   account_id: AccountId;
   from_index: U128 | null;
   limit: integer | null;
};

export type INftTokensForOwnerResult = Token[];

export function useNftTokensForOwnerQuery(opts: Omit<NearQueryOptions<INftTokensForOwnerResult, INftTokensForOwnerArgs>, 'contract'>) {
    return useNftQueryRaw<INftTokensForOwnerResult, INftTokensForOwnerArgs>(NftViewMethods.nft_tokens_for_owner, opts);
}

// nft_total_supply query

export type INftTotalSupplyArgs = {

};

export type INftTotalSupplyResult = U128;

export function useNftTotalSupplyQuery(opts: Omit<NearQueryOptions<INftTotalSupplyResult, INftTotalSupplyArgs>, 'contract'>) {
    return useNftQueryRaw<INftTotalSupplyResult, INftTotalSupplyArgs>(NftViewMethods.nft_total_supply, opts);
}

// nft_transfer mutation (payable)

export type INftTransferArgs = {
   receiver_id: AccountId;
   token_id: string;
   approval_id: integer | null;
   memo: string | null;
};

export type INftTransferResult = void;

export function useNftTransferMutation(opts: Omit<NearMutationOptions<INftTransferResult, INftTransferArgs>, 'contract'>) {
    return useNftMutationRaw<INftTransferResult, INftTransferArgs>(NftChangeMethods.nft_transfer, opts);
}

// nft_transfer_call mutation (payable)

export type INftTransferCallArgs = {
   receiver_id: AccountId;
   token_id: string;
   approval_id: integer | null;
   memo: string | null;
   msg: string;
};

export type INftTransferCallResult = PromiseOrValueBoolean;

export function useNftTransferCallMutation(opts: Omit<NearMutationOptions<INftTransferCallResult, INftTransferCallArgs>, 'contract'>) {
    return useNftMutationRaw<INftTransferCallResult, INftTransferCallArgs>(NftChangeMethods.nft_transfer_call, opts);
}

// nft_transfer_payout mutation (payable)

export type INftTransferPayoutArgs = {
   receiver_id: AccountId;
   token_id: string;
   approval_id: integer;
   balance: U128;
   max_len_payout: integer;
   memo: string | null;
};

export type INftTransferPayoutResult = Payout;

export function useNftTransferPayoutMutation(opts: Omit<NearMutationOptions<INftTransferPayoutResult, INftTransferPayoutArgs>, 'contract'>) {
    return useNftMutationRaw<INftTransferPayoutResult, INftTransferPayoutArgs>(NftChangeMethods.nft_transfer_payout, opts);
}

// nft_upgrade mutation (payable)

export type INftUpgradeArgs = {
   token_id: string;
};

export type INftUpgradeResult = void;

export function useNftUpgradeMutation(opts: Omit<NearMutationOptions<INftUpgradeResult, INftUpgradeArgs>, 'contract'>) {
    return useNftMutationRaw<INftUpgradeResult, INftUpgradeArgs>(NftChangeMethods.nft_upgrade, opts);
}

// nft_upgrade_price query

export type INftUpgradePriceArgs = {
   token_id: string;
};

export type INftUpgradePriceResult = [AccountId, U128] | null;

export function useNftUpgradePriceQuery(opts: Omit<NearQueryOptions<INftUpgradePriceResult, INftUpgradePriceArgs>, 'contract'>) {
    return useNftQueryRaw<INftUpgradePriceResult, INftUpgradePriceArgs>(NftViewMethods.nft_upgrade_price, opts);
}

// set_is_paused mutation

export type ISetIsPausedArgs = {
   pause: boolean;
};

export type ISetIsPausedResult = boolean;

export function useSetIsPausedMutation(opts: Omit<NearMutationOptions<ISetIsPausedResult, ISetIsPausedArgs>, 'contract'>) {
    return useNftMutationRaw<ISetIsPausedResult, ISetIsPausedArgs>(NftChangeMethods.set_is_paused, opts);
}

// set_royalty_account mutation

export type ISetRoyaltyAccountArgs = {
   account_id: AccountId;
};

export type ISetRoyaltyAccountResult = AccountId;

export function useSetRoyaltyAccountMutation(opts: Omit<NearMutationOptions<ISetRoyaltyAccountResult, ISetRoyaltyAccountArgs>, 'contract'>) {
    return useNftMutationRaw<ISetRoyaltyAccountResult, ISetRoyaltyAccountArgs>(NftChangeMethods.set_royalty_account, opts);
}

// set_royalty_value mutation

export type ISetRoyaltyValueArgs = {
   contract_royalty: integer;
};

export type ISetRoyaltyValueResult = void;

export function useSetRoyaltyValueMutation(opts: Omit<NearMutationOptions<ISetRoyaltyValueResult, ISetRoyaltyValueArgs>, 'contract'>) {
    return useNftMutationRaw<ISetRoyaltyValueResult, ISetRoyaltyValueArgs>(NftChangeMethods.set_royalty_value, opts);
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
export type Base64VecU8 = string;
export type U128 = string;
export type PromiseOrValueArrayOf_U128 = U128[];
export type PromiseOrValueBoolean = boolean;

export interface Definitions {
  AccountId?: AccountId;
  Base64VecU8?: Base64VecU8;
  NFTContractMetadata?: NFTContractMetadata;
  Payout?: Payout;
  Promise?: true;
  PromiseOrValueArrayOf_U128?: PromiseOrValueArrayOf_U128;
  PromiseOrValueBoolean?: PromiseOrValueBoolean;
  Token?: Token;
  TokenMetadata?: TokenMetadata;
  U128?: U128;
}
/**
 * Metadata for the NFT contract itself.
 */
export interface NFTContractMetadata {
  base_uri?: string | null;
  icon?: string | null;
  name: string;
  reference?: string | null;
  reference_hash?: Base64VecU8 | null;
  spec: string;
  symbol: string;
}
export interface Payout {
  payout: {
    [k: string]: U128;
  };
}
/**
 * In this implementation, the Token struct takes two extensions standards (metadata and approval) as optional fields, as they are frequently used in modern NFTs.
 */
export interface Token {
  approved_account_ids?: {
    [k: string]: number;
  } | null;
  bind_to_owner?: boolean | null;
  metadata?: TokenMetadata | null;
  owner_id: AccountId;
  rarity?: number | null;
  reveal_at?: number | null;
  royalty?: {
    [k: string]: number;
  } | null;
  token_id: string;
  types?: {
    [k: string]: string;
  } | null;
}
/**
 * Metadata on the individual token level.
 */
export interface TokenMetadata {
  copies?: number | null;
  description?: string | null;
  expires_at?: string | null;
  extra?: string | null;
  issued_at?: string | null;
  media?: string | null;
  media_hash?: Base64VecU8 | null;
  reference?: string | null;
  reference_hash?: Base64VecU8 | null;
  starts_at?: string | null;
  title?: string | null;
  updated_at?: string | null;
}

type integer = number;