import {
   useNearWallet,
   useNear,
   useNearUser,
   useNearAccount,
   useNearMutation,
   useNearQuery,
} from './hooks';
import NearProvider, { NearContext } from './NearProvider';
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';
import NearEnvironmentProvider, { NearEnvironmentContext, useNearEnvironment } from './environment';
import { NearEnvironment } from './config';
import NearContractProvider from './contract/NearContractProvider';
import useNearContract from './contract/useNearContract';

export {
   useNear,
   useNearWallet,
   useNearUser,
   useNearAccount,
   //
   NEAR_GAS,
   //
   NearProvider,
   NearContext,
   //
   NearEnvironment,
   getNearConfig,
   getNearError,
   //
   useNearQuery,
   useNearMutation,
   //
   NearEnvironmentContext,
   useNearEnvironment,
   NearEnvironmentProvider,
   //
   NearContractProvider,
   useNearContract,
};
