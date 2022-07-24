import React from 'react';
import {
   NearEnvironment,
   NearEnvironmentProvider,
   NearEnvironmentProviderProps,
   NearProvider,
   NearProviderProps,
} from './index';

function withNear<T = any>(
   AppComponent: React.FC<React.PropsWithChildren<T>> & { getInitialProps?: any },
   {
      defaultEnvironment = NearEnvironment.TestNet,
      environmentProps = {},
      providerProps = {},
   }: {
      defaultEnvironment?: NearEnvironment;
      providerProps?: Omit<
         NearProviderProps,
         'defaultEnvironment' | 'defaultClient' | 'defaultState'
      >;
      environmentProps?: NearEnvironmentProviderProps;
   },
) {
   const Wrapper = (appProps: T) => {
      return (
         <NearEnvironmentProvider {...environmentProps} defaultEnvironment={defaultEnvironment}>
            <NearProvider {...providerProps}>
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
