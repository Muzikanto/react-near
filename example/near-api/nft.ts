import { useNearQuery, useNearMutation, useNearContract } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const NFT_CONTRACT_NAME = 'mfight-nft_v2.testnet';

export enum NftViewMethods {
  assert_approve = 'assert_approve',
  assert_burn = 'assert_burn',
  assert_owner = 'assert_owner',
  assert_transfer = 'assert_transfer',
  is_blacklist = 'is_blacklist',
  is_paused = 'is_paused',
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
}

export enum NftChangeMethods {
  blacklist_add = 'blacklist_add',
  blacklist_remove = 'blacklist_remove',
  mt_on_transfer = 'mt_on_transfer',
  nft_approve = 'nft_approve', // payable
  nft_burn = 'nft_burn', // payable
  nft_mint = 'nft_mint',
  nft_resolve_transfer = 'nft_resolve_transfer',
  nft_revoke = 'nft_revoke', // payable
  nft_revoke_all = 'nft_revoke_all', // payable
  nft_transfer = 'nft_transfer', // payable
  nft_transfer_call = 'nft_transfer_call', // payable
  nft_transfer_payout = 'nft_transfer_payout', // payable
  set_is_paused = 'set_is_paused',
  set_royalty_account = 'set_royalty_account',
  set_royalty_value = 'set_royalty_value',
}

export function useNftContract() {
  return (
    useNearContract(NFT_CONTRACT_NAME, {
      viewMethods: [
        NftViewMethods.assert_approve,
        NftViewMethods.assert_burn,
        NftViewMethods.assert_owner,
        NftViewMethods.assert_transfer,
        NftViewMethods.is_blacklist,
        NftViewMethods.is_paused,
        NftViewMethods.nft_is_approved,
        NftViewMethods.nft_is_bind_to_owner,
        NftViewMethods.nft_metadata,
        NftViewMethods.nft_payout,
        NftViewMethods.nft_royalty_account,
        NftViewMethods.nft_royalty_value,
        NftViewMethods.nft_supply_for_owner,
        NftViewMethods.nft_token,
        NftViewMethods.nft_tokens,
        NftViewMethods.nft_tokens_by_ids,
        NftViewMethods.nft_tokens_for_owner,
        NftViewMethods.nft_total_supply,
      ],
      changeMethods: [
        NftChangeMethods.blacklist_add,
        NftChangeMethods.blacklist_remove,
        NftChangeMethods.mt_on_transfer,
        NftChangeMethods.nft_approve,
        NftChangeMethods.nft_burn,
        NftChangeMethods.nft_mint,
        NftChangeMethods.nft_resolve_transfer,
        NftChangeMethods.nft_revoke,
        NftChangeMethods.nft_revoke_all,
        NftChangeMethods.nft_transfer,
        NftChangeMethods.nft_transfer_call,
        NftChangeMethods.nft_transfer_payout,
        NftChangeMethods.set_is_paused,
        NftChangeMethods.set_royalty_account,
        NftChangeMethods.set_royalty_value,
      ],
    }
  ));
}

export function useNftQueryRaw<Res = any, Req = any>(
  methodName: NftViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = useNftContract();

  return useNearQuery(methodName, { contract, ...opts });
}

export function useNftMutationRaw<Res = any, Req = any>(
  methodName: NftChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = useNftContract();

  return useNearMutation(methodName, { contract, ...opts });
}

// assert_approve query

export type IAssertApproveArgs = {
   token_id: string;
   contract_id: AccountId;
};

export type IAssertApproveResult = void;

export function useAssertApproveQuery(opts: NearQueryOptions<IAssertApproveResult, IAssertApproveArgs>) {
    return useNftQueryRaw<IAssertApproveResult, IAssertApproveArgs>(NftViewMethods.assert_approve, opts);
}

// assert_burn query

export type IAssertBurnArgs = {
   token_id: string;
};

export type IAssertBurnResult = void;

export function useAssertBurnQuery(opts: NearQueryOptions<IAssertBurnResult, IAssertBurnArgs>) {
    return useNftQueryRaw<IAssertBurnResult, IAssertBurnArgs>(NftViewMethods.assert_burn, opts);
}

// assert_owner query

export type IAssertOwnerArgs = {

};

export type IAssertOwnerResult = void;

export function useAssertOwnerQuery(opts: NearQueryOptions<IAssertOwnerResult, IAssertOwnerArgs>) {
    return useNftQueryRaw<IAssertOwnerResult, IAssertOwnerArgs>(NftViewMethods.assert_owner, opts);
}

// assert_transfer query

export type IAssertTransferArgs = {
   token_id: string;
   receiver_id: AccountId;
};

export type IAssertTransferResult = void;

export function useAssertTransferQuery(opts: NearQueryOptions<IAssertTransferResult, IAssertTransferArgs>) {
    return useNftQueryRaw<IAssertTransferResult, IAssertTransferArgs>(NftViewMethods.assert_transfer, opts);
}

// blacklist_add mutation

export type IBlacklistAddArgs = {
   account_id: AccountId;
};

export type IBlacklistAddResult = boolean;

export function useBlacklistAddMutation(opts: NearMutationOptions<IBlacklistAddResult, IBlacklistAddArgs>) {
    return useNftMutationRaw<IBlacklistAddResult, IBlacklistAddArgs>(NftChangeMethods.blacklist_add, opts);
}

// blacklist_remove mutation

export type IBlacklistRemoveArgs = {
   account_id: AccountId;
};

export type IBlacklistRemoveResult = boolean;

export function useBlacklistRemoveMutation(opts: NearMutationOptions<IBlacklistRemoveResult, IBlacklistRemoveArgs>) {
    return useNftMutationRaw<IBlacklistRemoveResult, IBlacklistRemoveArgs>(NftChangeMethods.blacklist_remove, opts);
}

// is_blacklist query

export type IIsBlacklistArgs = {
   account_id: AccountId;
};

export type IIsBlacklistResult = boolean;

export function useIsBlacklistQuery(opts: NearQueryOptions<IIsBlacklistResult, IIsBlacklistArgs>) {
    return useNftQueryRaw<IIsBlacklistResult, IIsBlacklistArgs>(NftViewMethods.is_blacklist, opts);
}

// is_paused query

export type IIsPausedArgs = {

};

export type IIsPausedResult = boolean;

export function useIsPausedQuery(opts: NearQueryOptions<IIsPausedResult, IIsPausedArgs>) {
    return useNftQueryRaw<IIsPausedResult, IIsPausedArgs>(NftViewMethods.is_paused, opts);
}

// mt_on_transfer mutation

export type IMtOnTransferArgs = {
   sender_id: AccountId;
   token_ids: AccountId[];
   amounts: U128[];
   msg: string;
};

export type IMtOnTransferResult = PromiseOrValueArrayOf_U128;

export function useMtOnTransferMutation(opts: NearMutationOptions<IMtOnTransferResult, IMtOnTransferArgs>) {
    return useNftMutationRaw<IMtOnTransferResult, IMtOnTransferArgs>(NftChangeMethods.mt_on_transfer, opts);
}

// nft_approve mutation (payable)

export type INftApproveArgs = {
   token_id: string;
   account_id: AccountId;
   msg: string | null;
};

export type INftApproveResult = void | null;

export function useNftApproveMutation(opts: NearMutationOptions<INftApproveResult, INftApproveArgs>) {
    return useNftMutationRaw<INftApproveResult, INftApproveArgs>(NftChangeMethods.nft_approve, opts);
}

// nft_burn mutation (payable)

export type INftBurnArgs = {
   token_id: string;
};

export type INftBurnResult = void;

export function useNftBurnMutation(opts: NearMutationOptions<INftBurnResult, INftBurnArgs>) {
    return useNftMutationRaw<INftBurnResult, INftBurnArgs>(NftChangeMethods.nft_burn, opts);
}

// nft_is_approved query

export type INftIsApprovedArgs = {
   token_id: string;
   approved_account_id: AccountId;
   approval_id: number | null;
};

export type INftIsApprovedResult = boolean;

export function useNftIsApprovedQuery(opts: NearQueryOptions<INftIsApprovedResult, INftIsApprovedArgs>) {
    return useNftQueryRaw<INftIsApprovedResult, INftIsApprovedArgs>(NftViewMethods.nft_is_approved, opts);
}

// nft_is_bind_to_owner query

export type INftIsBindToOwnerArgs = {
   token_id: string;
};

export type INftIsBindToOwnerResult = boolean;

export function useNftIsBindToOwnerQuery(opts: NearQueryOptions<INftIsBindToOwnerResult, INftIsBindToOwnerArgs>) {
    return useNftQueryRaw<INftIsBindToOwnerResult, INftIsBindToOwnerArgs>(NftViewMethods.nft_is_bind_to_owner, opts);
}

// nft_metadata query

export type INftMetadataArgs = {

};

export type INftMetadataResult = NFTContractMetadata;

export function useNftMetadataQuery(opts: NearQueryOptions<INftMetadataResult, INftMetadataArgs>) {
    return useNftQueryRaw<INftMetadataResult, INftMetadataArgs>(NftViewMethods.nft_metadata, opts);
}

// nft_mint mutation

export type INftMintArgs = {
   token_id: string;
   receiver_id: AccountId | null;
   token_metadata: TokenMetadata;
   rarity: TokenRarity;
   collection: TokenCollection;
   token_type: TokenType;
   token_sub_type: TokenSubType | null;
   bind_to_owner: boolean | null;
   perpetual_royalties: object | null;
};

export type INftMintResult = Token;

export function useNftMintMutation(opts: NearMutationOptions<INftMintResult, INftMintArgs>) {
    return useNftMutationRaw<INftMintResult, INftMintArgs>(NftChangeMethods.nft_mint, opts);
}

// nft_payout query

export type INftPayoutArgs = {
   token_id: string;
   balance: U128;
   max_len_payout: integer;
};

export type INftPayoutResult = Payout;

export function useNftPayoutQuery(opts: NearQueryOptions<INftPayoutResult, INftPayoutArgs>) {
    return useNftQueryRaw<INftPayoutResult, INftPayoutArgs>(NftViewMethods.nft_payout, opts);
}

// nft_resolve_transfer mutation

export type INftResolveTransferArgs = {
   previous_owner_id: AccountId;
   receiver_id: AccountId;
   token_id: string;
   approved_account_ids: object | null;
};

export type INftResolveTransferResult = boolean;

export function useNftResolveTransferMutation(opts: NearMutationOptions<INftResolveTransferResult, INftResolveTransferArgs>) {
    return useNftMutationRaw<INftResolveTransferResult, INftResolveTransferArgs>(NftChangeMethods.nft_resolve_transfer, opts);
}

// nft_revoke mutation (payable)

export type INftRevokeArgs = {
   token_id: string;
   account_id: AccountId;
};

export type INftRevokeResult = void;

export function useNftRevokeMutation(opts: NearMutationOptions<INftRevokeResult, INftRevokeArgs>) {
    return useNftMutationRaw<INftRevokeResult, INftRevokeArgs>(NftChangeMethods.nft_revoke, opts);
}

// nft_revoke_all mutation (payable)

export type INftRevokeAllArgs = {
   token_id: string;
};

export type INftRevokeAllResult = void;

export function useNftRevokeAllMutation(opts: NearMutationOptions<INftRevokeAllResult, INftRevokeAllArgs>) {
    return useNftMutationRaw<INftRevokeAllResult, INftRevokeAllArgs>(NftChangeMethods.nft_revoke_all, opts);
}

// nft_royalty_account query

export type INftRoyaltyAccountArgs = {

};

export type INftRoyaltyAccountResult = AccountId;

export function useNftRoyaltyAccountQuery(opts: NearQueryOptions<INftRoyaltyAccountResult, INftRoyaltyAccountArgs>) {
    return useNftQueryRaw<INftRoyaltyAccountResult, INftRoyaltyAccountArgs>(NftViewMethods.nft_royalty_account, opts);
}

// nft_royalty_value query

export type INftRoyaltyValueArgs = {

};

export type INftRoyaltyValueResult = integer;

export function useNftRoyaltyValueQuery(opts: NearQueryOptions<INftRoyaltyValueResult, INftRoyaltyValueArgs>) {
    return useNftQueryRaw<INftRoyaltyValueResult, INftRoyaltyValueArgs>(NftViewMethods.nft_royalty_value, opts);
}

// nft_supply_for_owner query

export type INftSupplyForOwnerArgs = {
   account_id: AccountId;
};

export type INftSupplyForOwnerResult = U128;

export function useNftSupplyForOwnerQuery(opts: NearQueryOptions<INftSupplyForOwnerResult, INftSupplyForOwnerArgs>) {
    return useNftQueryRaw<INftSupplyForOwnerResult, INftSupplyForOwnerArgs>(NftViewMethods.nft_supply_for_owner, opts);
}

// nft_token query

export type INftTokenArgs = {
   token_id: string;
};

export type INftTokenResult = Token | null;

export function useNftTokenQuery(opts: NearQueryOptions<INftTokenResult, INftTokenArgs>) {
    return useNftQueryRaw<INftTokenResult, INftTokenArgs>(NftViewMethods.nft_token, opts);
}

// nft_tokens query

export type INftTokensArgs = {
   from_index: U128 | null;
   limit: number | null;
};

export type INftTokensResult = Token[];

export function useNftTokensQuery(opts: NearQueryOptions<INftTokensResult, INftTokensArgs>) {
    return useNftQueryRaw<INftTokensResult, INftTokensArgs>(NftViewMethods.nft_tokens, opts);
}

// nft_tokens_by_ids query

export type INftTokensByIdsArgs = {
   ids: string[];
};

export type INftTokensByIdsResult = Token[];

export function useNftTokensByIdsQuery(opts: NearQueryOptions<INftTokensByIdsResult, INftTokensByIdsArgs>) {
    return useNftQueryRaw<INftTokensByIdsResult, INftTokensByIdsArgs>(NftViewMethods.nft_tokens_by_ids, opts);
}

// nft_tokens_for_owner query

export type INftTokensForOwnerArgs = {
   account_id: AccountId;
   from_index: U128 | null;
   limit: number | null;
};

export type INftTokensForOwnerResult = Token[];

export function useNftTokensForOwnerQuery(opts: NearQueryOptions<INftTokensForOwnerResult, INftTokensForOwnerArgs>) {
    return useNftQueryRaw<INftTokensForOwnerResult, INftTokensForOwnerArgs>(NftViewMethods.nft_tokens_for_owner, opts);
}

// nft_total_supply query

export type INftTotalSupplyArgs = {

};

export type INftTotalSupplyResult = U128;

export function useNftTotalSupplyQuery(opts: NearQueryOptions<INftTotalSupplyResult, INftTotalSupplyArgs>) {
    return useNftQueryRaw<INftTotalSupplyResult, INftTotalSupplyArgs>(NftViewMethods.nft_total_supply, opts);
}

// nft_transfer mutation (payable)

export type INftTransferArgs = {
   receiver_id: AccountId;
   token_id: string;
   approval_id: number | null;
   memo: string | null;
};

export type INftTransferResult = void;

export function useNftTransferMutation(opts: NearMutationOptions<INftTransferResult, INftTransferArgs>) {
    return useNftMutationRaw<INftTransferResult, INftTransferArgs>(NftChangeMethods.nft_transfer, opts);
}

// nft_transfer_call mutation (payable)

export type INftTransferCallArgs = {
   receiver_id: AccountId;
   token_id: string;
   approval_id: number | null;
   memo: string | null;
   msg: string;
};

export type INftTransferCallResult = PromiseOrValueBoolean;

export function useNftTransferCallMutation(opts: NearMutationOptions<INftTransferCallResult, INftTransferCallArgs>) {
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

export function useNftTransferPayoutMutation(opts: NearMutationOptions<INftTransferPayoutResult, INftTransferPayoutArgs>) {
    return useNftMutationRaw<INftTransferPayoutResult, INftTransferPayoutArgs>(NftChangeMethods.nft_transfer_payout, opts);
}

// set_is_paused mutation

export type ISetIsPausedArgs = {
   pause: boolean;
};

export type ISetIsPausedResult = boolean;

export function useSetIsPausedMutation(opts: NearMutationOptions<ISetIsPausedResult, ISetIsPausedArgs>) {
    return useNftMutationRaw<ISetIsPausedResult, ISetIsPausedArgs>(NftChangeMethods.set_is_paused, opts);
}

// set_royalty_account mutation

export type ISetRoyaltyAccountArgs = {
   account_id: AccountId;
};

export type ISetRoyaltyAccountResult = AccountId;

export function useSetRoyaltyAccountMutation(opts: NearMutationOptions<ISetRoyaltyAccountResult, ISetRoyaltyAccountArgs>) {
    return useNftMutationRaw<ISetRoyaltyAccountResult, ISetRoyaltyAccountArgs>(NftChangeMethods.set_royalty_account, opts);
}

// set_royalty_value mutation

export type ISetRoyaltyValueArgs = {
   contract_royalty: integer;
};

export type ISetRoyaltyValueResult = void;

export function useSetRoyaltyValueMutation(opts: NearMutationOptions<ISetRoyaltyValueResult, ISetRoyaltyValueArgs>) {
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
export type TokenCollection =
  | "Fantasy"
  | "Medieval"
  | "Nordic"
  | "PostApoc"
  | "SteamPunk"
  | "Asian"
  | "CyberPunk"
  | "Unknown";
export type TokenRarity = "Common" | "Uncommon" | "Rare" | "Uniq" | "Epic" | "Legendary" | "Artefact";
export type TokenSubType =
  | "Unknown"
  | "Ring"
  | "Earring"
  | "Necklace"
  | "Helmet"
  | "HelmetLight"
  | "HelmetHeavy"
  | "Body"
  | "BodyLight"
  | "BodyHeavy"
  | "Pants"
  | "PantsLight"
  | "PantsHeavy"
  | "Boots"
  | "BootsLight"
  | "BootsHeavy"
  | "Gloves"
  | "GlovesLight"
  | "GlovesHeavy"
  | "Cloak"
  | "Wristband"
  | "WristbandLight"
  | "WristbandHeavy"
  | "Belt"
  | "BeltLight"
  | "BeltHeavy"
  | "Wand"
  | "Castet"
  | "Knife"
  | "Sword"
  | "Sword2"
  | "Hatchet"
  | "Hatchet2"
  | "Cudgel"
  | "Cudgel2"
  | "Staff"
  | "Shield"
  | "Pet"
  | "Race"
  | "Class"
  | "MagCrit"
  | "MagDodge"
  | "Tank"
  | "Warrior"
  | "MonkBuff"
  | "MonkParry"
  | "Bear"
  | "Boar"
  | "Chicken"
  | "Wolf"
  | "Bandit"
  | "Raptor"
  | "Tester"
  | "Ladder"
  | "PreAlphaTester"
  | "AlphaTester"
  | "BetaTester"
  | "Cup"
  | "Pen"
  | "Camera"
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Giant"
  | "BeastMan"
  | "Werewolf";
export type TokenType =
  | "Sketch"
  | "Badge"
  | "Skin"
  | "Avatar"
  | "Pet"
  | "Race"
  | "Class"
  | "Weapon"
  | "Armor"
  | "Jewelry"
  | "Shield"
  | "Access"
  | "Present";

export interface Definitions {
  AccountId?: AccountId;
  Base64VecU8?: Base64VecU8;
  NFTContractMetadata?: NFTContractMetadata;
  Payout?: Payout;
  Promise?: true;
  PromiseOrValueArrayOf_U128?: PromiseOrValueArrayOf_U128;
  PromiseOrValueBoolean?: PromiseOrValueBoolean;
  Token?: Token;
  TokenCollection?: TokenCollection;
  TokenMetadata?: TokenMetadata;
  TokenRarity?: TokenRarity;
  TokenSubType?: TokenSubType;
  TokenType?: TokenType;
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
  collection?: TokenCollection | null;
  metadata?: TokenMetadata | null;
  owner_id: AccountId;
  rarity?: TokenRarity | null;
  royalty?: {
    [k: string]: number;
  } | null;
  token_id: string;
  token_sub_type?: TokenSubType | null;
  token_type?: TokenType | null;
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