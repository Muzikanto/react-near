import React from 'react';
import { NearEnvironment, NearEnvironmentProvider, NearProvider } from '../index';
import { NearEnvironmentProviderProps } from '../core/env';
import { NearProviderProps } from '../core/near';

function withNear<T = any>(
   AppComponent: React.FC<React.PropsWithChildren<T>> & { getInitialProps?: any },
   {
      defaultEnvironment = NearEnvironment.TestNet,
      environmentProps = {},
      providerProps = {},
      authContractId,
   }: {
      defaultEnvironment?: NearEnvironment;
      providerProps?: Omit<
         NearProviderProps,
         'defaultEnvironment' | 'defaultClient' | 'defaultState' | 'authContractId' | 'children'
      >;
      environmentProps?: NearEnvironmentProviderProps;
      authContractId: string;
   },
) {
   const Wrapper = (appProps: T) => {
      return (
         <NearEnvironmentProvider {...environmentProps} defaultEnvironment={defaultEnvironment}>
            <NearProvider {...providerProps} authContractId={authContractId}>
               <AppComponent {...appProps} />
            </NearProvider>
         </NearEnvironmentProvider>
      );
   };

   if (AppComponent.getInitialProps) {
      Wrapper.getInitialProps = AppComponent.getInitialProps;
   }

   return Wrapper;
}

export default withNear;
