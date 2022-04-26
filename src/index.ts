import {
   useNearWallet,
   useNear,
   useNearUser,
   useNearAccount,
   useNearMutation,
   useNearQuery,
   NearQueryOptions,
   NearMutationOptions,
} from './hooks';
import NearProvider, { NearContext, NearContextType, NearProviderProps } from './NearProvider';
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';
import NearEnvironmentProvider, {
   NearEnvironmentContext,
   useNearEnvironment,
   NearEnvironmentContextType,
   NearEnvironmentProviderProps,
} from './environment';
import { NearEnvironment } from './config';

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
   NearContextType,
   NearProviderProps,
   //
   NearEnvironment,
   getNearConfig,
   getNearError,
   //
   useNearQuery,
   NearQueryOptions,
   useNearMutation,
   NearMutationOptions,
   //
   NearEnvironmentContext,
   useNearEnvironment,
   NearEnvironmentContextType,
   NearEnvironmentProviderProps,
   NearEnvironmentProvider,
};
