import {
   useNearWallet,
   useNear,
   useNearUser,
   useNearAccount,
   useNearMutation,
   useNearQuery,
} from './hooks';
import NearProvider, { NearContext, makeNearProviderState } from './NearProvider';
import getNearConfig, { NEAR_GAS } from './config';
import {
   getNearError,
   formatNearAddress,
   formatNearPrice,
   parseNearAmount,
   isValidNearAddress,
   parseNearDate,
} from './utils';
import NearEnvironmentProvider, { NearEnvironmentContext, useNearEnvironment } from './environment';
import { NearEnvironment } from './config';
import NearContractProvider from './contract/NearContractProvider';
import useNearContract from './contract/useNearContract';
import { collectNearData } from './collectNearInfo';
import createNearClient, { useNearClient, encodeRequest } from './core/client';

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
   makeNearProviderState,
   //
   NearEnvironment,
   getNearConfig,
   getNearError,
   formatNearAddress,
   formatNearPrice,
   parseNearAmount,
   isValidNearAddress,
   parseNearDate,
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
   //
   collectNearData,
   //
   createNearClient,
   encodeRequest,
   useNearClient,
};
