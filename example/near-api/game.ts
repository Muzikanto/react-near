import { useNearQuery, useNearMutation, useNearContract } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const GAME_CONTRACT_NAME = 'mfight.testnet';

export enum GameViewMethods {
  game_clan = 'game_clan',
  game_player = 'game_player',
  game_player_up_price = 'game_player_up_price',
  get_owner = 'get_owner',
  is_account_blocked = 'is_account_blocked',
  is_paused = 'is_paused',
}

export enum GameChangeMethods {
  block_account = 'block_account',
  fix = 'fix',
  game_create_clan = 'game_create_clan',
  game_create_player = 'game_create_player', // payable
  set_is_paused = 'set_is_paused',
}

export interface IGameContract {
   // view methods
   game_clan(args: IGameClanArgs): IGameClanResult
   game_player(args: IGamePlayerArgs): IGamePlayerResult
   game_player_up_price(args: IGamePlayerUpPriceArgs): IGamePlayerUpPriceResult
   get_owner(args: IGetOwnerArgs): IGetOwnerResult
   is_account_blocked(args: IIsAccountBlockedArgs): IIsAccountBlockedResult
   is_paused(args: IIsPausedArgs): IIsPausedResult
   // change methods
   block_account(args: IBlockAccountArgs): IBlockAccountResult
   fix(args: IFixArgs): IFixResult
   game_create_clan(args: IGameCreateClanArgs): IGameCreateClanResult
   game_create_player(args: IGameCreatePlayerArgs): IGameCreatePlayerResult
   set_is_paused(args: ISetIsPausedArgs): ISetIsPausedResult
}

export function useGameContract() {
  return (
    useNearContract<IGameContract>(GAME_CONTRACT_NAME, {
      viewMethods: [
        GameViewMethods.game_clan,
        GameViewMethods.game_player,
        GameViewMethods.game_player_up_price,
        GameViewMethods.get_owner,
        GameViewMethods.is_account_blocked,
        GameViewMethods.is_paused,
      ],
      changeMethods: [
        GameChangeMethods.block_account,
        GameChangeMethods.fix,
        GameChangeMethods.game_create_clan,
        GameChangeMethods.game_create_player,
        GameChangeMethods.set_is_paused,
      ],
    }
  ));
}

export function useGameQueryRaw<Res = any, Req = any>(
  methodName: GameViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = useGameContract();

  return useNearQuery(methodName, { contract, ...opts });
}

export function useGameMutationRaw<Res = any, Req = any>(
  methodName: GameChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = useGameContract();

  return useNearMutation(methodName, { contract, ...opts });
}

// block_account mutation

export type IBlockAccountArgs = {
   account_id: AccountId;
   blocked: boolean;
};

export type IBlockAccountResult = boolean;

export function useBlockAccountMutation(opts: NearMutationOptions<IBlockAccountResult, IBlockAccountArgs>) {
    return useGameMutationRaw<IBlockAccountResult, IBlockAccountArgs>(GameChangeMethods.block_account, opts);
}

// fix mutation

export type IFixArgs = {

};

export type IFixResult = string;

export function useFixMutation(opts: NearMutationOptions<IFixResult, IFixArgs>) {
    return useGameMutationRaw<IFixResult, IFixArgs>(GameChangeMethods.fix, opts);
}

// game_clan query

export type IGameClanArgs = {
   account_id: AccountId;
};

export type IGameClanResult = GameClan;

export function useGameClanQuery(opts: NearQueryOptions<IGameClanResult, IGameClanArgs>) {
    return useGameQueryRaw<IGameClanResult, IGameClanArgs>(GameViewMethods.game_clan, opts);
}

// game_create_clan mutation

export type IGameCreateClanArgs = {

};

export type IGameCreateClanResult = GameClan;

export function useGameCreateClanMutation(opts: NearMutationOptions<IGameCreateClanResult, IGameCreateClanArgs>) {
    return useGameMutationRaw<IGameCreateClanResult, IGameCreateClanArgs>(GameChangeMethods.game_create_clan, opts);
}

// game_create_player mutation (payable)

export type IGameCreatePlayerArgs = {

};

export type IGameCreatePlayerResult = GamePlayer;

export function useGameCreatePlayerMutation(opts: NearMutationOptions<IGameCreatePlayerResult, IGameCreatePlayerArgs>) {
    return useGameMutationRaw<IGameCreatePlayerResult, IGameCreatePlayerArgs>(GameChangeMethods.game_create_player, opts);
}

// game_player query

export type IGamePlayerArgs = {
   account_id: AccountId;
};

export type IGamePlayerResult = GamePlayer;

export function useGamePlayerQuery(opts: NearQueryOptions<IGamePlayerResult, IGamePlayerArgs>) {
    return useGameQueryRaw<IGamePlayerResult, IGamePlayerArgs>(GameViewMethods.game_player, opts);
}

// game_player_up_price query

export type IGamePlayerUpPriceArgs = {
   level: integer;
};

export type IGamePlayerUpPriceResult = U128;

export function useGamePlayerUpPriceQuery(opts: NearQueryOptions<IGamePlayerUpPriceResult, IGamePlayerUpPriceArgs>) {
    return useGameQueryRaw<IGamePlayerUpPriceResult, IGamePlayerUpPriceArgs>(GameViewMethods.game_player_up_price, opts);
}

// get_owner query

export type IGetOwnerArgs = {

};

export type IGetOwnerResult = AccountId;

export function useGetOwnerQuery(opts: NearQueryOptions<IGetOwnerResult, IGetOwnerArgs>) {
    return useGameQueryRaw<IGetOwnerResult, IGetOwnerArgs>(GameViewMethods.get_owner, opts);
}

// is_account_blocked query

export type IIsAccountBlockedArgs = {
   account_id: AccountId;
};

export type IIsAccountBlockedResult = boolean;

export function useIsAccountBlockedQuery(opts: NearQueryOptions<IIsAccountBlockedResult, IIsAccountBlockedArgs>) {
    return useGameQueryRaw<IIsAccountBlockedResult, IIsAccountBlockedArgs>(GameViewMethods.is_account_blocked, opts);
}

// is_paused query

export type IIsPausedArgs = {

};

export type IIsPausedResult = boolean;

export function useIsPausedQuery(opts: NearQueryOptions<IIsPausedResult, IIsPausedArgs>) {
    return useGameQueryRaw<IIsPausedResult, IIsPausedArgs>(GameViewMethods.is_paused, opts);
}

// set_is_paused mutation

export type ISetIsPausedArgs = {
   pause: boolean;
};

export type ISetIsPausedResult = boolean;

export function useSetIsPausedMutation(opts: NearMutationOptions<ISetIsPausedResult, ISetIsPausedArgs>) {
    return useGameMutationRaw<ISetIsPausedResult, ISetIsPausedArgs>(GameChangeMethods.set_is_paused, opts);
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
export type PromiseOrValueU128 = string;
export type U128 = string;

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

type integer = number;