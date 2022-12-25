import { parseNearAmount } from './index';

export const NEAR_GAS: number = 200_000_000_000_000;
export const NEAR_MAX_GAS: number = 300_000_000_000_000;
export const NEAR_GAS_1: number = 100_000_000_000_000;
export const NEAR_GAS_MIN: number = 1_000_000_000_000;
export const NEAR_1_T_GAS: number = NEAR_GAS_MIN;
//
export const NEAR_ONE_YOCTO: string = '1';
export const ONE_NEAR_IN_YOCTO: string = parseNearAmount('1', 24);

export enum NearEnvironment {
   MainNet = 'mainnet',
   TestNet = 'testnet',
}
