import { useNearContract, useNearWallet, useNear, useNearUser, useNearAccount } from './hooks';
import NearProvider, { NearEnvironment, NearContext } from './NearProvider';
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';

export {
   NEAR_GAS,
   useNear,
   useNearWallet,
   useNearUser,
   useNearContract,
   NearProvider,
   NearEnvironment,
   getNearConfig,
   NearContext,
   getNearError,
   useNearAccount,
};
