import { useNearQuery, useNearMutation, useNearContract } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const TEST_CONTRACT_NAME = 'dev-1234567890';

export enum TestViewMethods {
  game_clan = 'game_clan',
  game_player = 'game_player',
  game_player_up_price = 'game_player_up_price',
  get_owner = 'get_owner',
  is_account_blocked = 'is_account_blocked',
  is_paused = 'is_paused',
}

export enum TestChangeMethods {
  block_account = 'block_account',
  fix = 'fix',
  game_create_clan = 'game_create_clan',
  game_create_player = 'game_create_player', // payable
  set_is_paused = 'set_is_paused',
}

export function useTestContract() {
  return (
    useNearContract(TEST_CONTRACT_NAME, {
      viewMethods: [
        TestViewMethods.game_clan,
        TestViewMethods.game_player,
        TestViewMethods.game_player_up_price,
        TestViewMethods.get_owner,
        TestViewMethods.is_account_blocked,
        TestViewMethods.is_paused,
      ],
      changeMethods: [
        TestChangeMethods.block_account,
        TestChangeMethods.fix,
        TestChangeMethods.game_create_clan,
        TestChangeMethods.game_create_player,
        TestChangeMethods.set_is_paused,
      ],
    }
  ));
}

// block_account mutation

export type IBlockAccountArgs = {
  "account_id": "AccountId",
  "blocked": "boolean"
};

export type IBlockAccountResult = boolean;

export function useBlockAccountMutation(opts: NearMutationOptions<IBlockAccountResult, IBlockAccountArgs>) {
    return useNearMutation<IBlockAccountResult, IBlockAccountArgs>(TestChangeMethods.block_account, opts);
}

// fix mutation

export type IFixArgs = {};

export type IFixResult = string;

export function useFixMutation(opts: NearMutationOptions<IFixResult, IFixArgs>) {
    return useNearMutation<IFixResult, IFixArgs>(TestChangeMethods.fix, opts);
}

// game_clan query

export type IGameClanArgs = {
  "account_id": "AccountId"
};

export type IGameClanResult = GameClan;

export function useGameClanQuery(opts: NearQueryOptions<IGameClanResult, IGameClanArgs>) {
    return useNearQuery<IGameClanResult, IGameClanArgs>(TestViewMethods.game_clan, opts);
}

// game_create_clan mutation

export type IGameCreateClanArgs = {};

export type IGameCreateClanResult = GameClan;

export function useGameCreateClanMutation(opts: NearMutationOptions<IGameCreateClanResult, IGameCreateClanArgs>) {
    return useNearMutation<IGameCreateClanResult, IGameCreateClanArgs>(TestChangeMethods.game_create_clan, opts);
}

// game_create_player mutation (payable)

export type IGameCreatePlayerArgs = {};

export type IGameCreatePlayerResult = GamePlayer;

export function useGameCreatePlayerMutation(opts: NearMutationOptions<IGameCreatePlayerResult, IGameCreatePlayerArgs>) {
    return useNearMutation<IGameCreatePlayerResult, IGameCreatePlayerArgs>(TestChangeMethods.game_create_player, opts);
}

// game_player query

export type IGamePlayerArgs = {
  "account_id": "AccountId"
};

export type IGamePlayerResult = GamePlayer;

export function useGamePlayerQuery(opts: NearQueryOptions<IGamePlayerResult, IGamePlayerArgs>) {
    return useNearQuery<IGamePlayerResult, IGamePlayerArgs>(TestViewMethods.game_player, opts);
}

// game_player_up_price query

export type IGamePlayerUpPriceArgs = {
  "level": "integer"
};

export type IGamePlayerUpPriceResult = U128;

export function useGamePlayerUpPriceQuery(opts: NearQueryOptions<IGamePlayerUpPriceResult, IGamePlayerUpPriceArgs>) {
    return useNearQuery<IGamePlayerUpPriceResult, IGamePlayerUpPriceArgs>(TestViewMethods.game_player_up_price, opts);
}

// get_owner query

export type IGetOwnerArgs = {};

export type IGetOwnerResult = AccountId;

export function useGetOwnerQuery(opts: NearQueryOptions<IGetOwnerResult, IGetOwnerArgs>) {
    return useNearQuery<IGetOwnerResult, IGetOwnerArgs>(TestViewMethods.get_owner, opts);
}

// is_account_blocked query

export type IIsAccountBlockedArgs = {
  "account_id": "AccountId"
};

export type IIsAccountBlockedResult = boolean;

export function useIsAccountBlockedQuery(opts: NearQueryOptions<IIsAccountBlockedResult, IIsAccountBlockedArgs>) {
    return useNearQuery<IIsAccountBlockedResult, IIsAccountBlockedArgs>(TestViewMethods.is_account_blocked, opts);
}

// is_paused query

export type IIsPausedArgs = {};

export type IIsPausedResult = boolean;

export function useIsPausedQuery(opts: NearQueryOptions<IIsPausedResult, IIsPausedArgs>) {
    return useNearQuery<IIsPausedResult, IIsPausedArgs>(TestViewMethods.is_paused, opts);
}

// set_is_paused mutation

export type ISetIsPausedArgs = {
  "pause": "boolean"
};

export type ISetIsPausedResult = boolean;

export function useSetIsPausedMutation(opts: NearMutationOptions<ISetIsPausedResult, ISetIsPausedArgs>) {
    return useNearMutation<ISetIsPausedResult, ISetIsPausedArgs>(TestChangeMethods.set_is_paused, opts);
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
export type PromiseOrValueU128 = number;
export type U128 = number;

export interface Definitions {
  AccountId?: AccountId;
  GameClan?: GameClan;
  GamePlayer?: GamePlayer;
  PromiseOrValueU128?: PromiseOrValueU128;
  U128?: U128;
}
export interface GameClan {
  level: number;
}
export interface GamePlayer {
  level: number;
}
