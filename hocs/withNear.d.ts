import React from 'react';
import { NearEnvironment } from '../index';
import { NearEnvironmentProviderProps } from '../core/env';
import { NearProviderProps } from '../core/near';
declare function withNear<T = any>(AppComponent: React.FC<React.PropsWithChildren<T>> & {
    getInitialProps?: any;
}, { defaultEnvironment, environmentProps, providerProps, authContractId, }: {
    defaultEnvironment?: NearEnvironment;
    providerProps?: Omit<NearProviderProps, 'defaultEnvironment' | 'defaultClient' | 'defaultState' | 'authContractId' | 'children'>;
    environmentProps?: NearEnvironmentProviderProps;
    authContractId: string;
}): {
    (appProps: T): JSX.Element;
    getInitialProps: any;
};
export default withNear;
