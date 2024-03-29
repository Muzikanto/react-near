import React from 'react';
import { NearEnvironment } from '../utils/config';
import { getNearCookie, setNearCookie } from '../utils';

export interface NearEnvironmentContextType {
   value: NearEnvironment;
   update: (value: NearEnvironment) => void;
   isProvided?: boolean;
}

export type NearEnvironmentProviderProps = {
   defaultEnvironment?: NearEnvironment;
};

export const NearEnvironmentContext = React.createContext<NearEnvironmentContextType>({
   value: NearEnvironment.TestNet,
   update: () => {},
   isProvided: false,
});

const NearEnvironmentProvider: React.FC<React.PropsWithChildren<NearEnvironmentProviderProps>> = ({
   defaultEnvironment = NearEnvironment.TestNet,
   children,
}) => {
   let nearEnv =
      (typeof window === 'undefined' ? defaultEnvironment : getNearCookie('near-env')) ||
      defaultEnvironment;

   React.useEffect(() => {
      if (![NearEnvironment.MainNet, NearEnvironment.TestNet].includes(nearEnv as any)) {
         nearEnv = defaultEnvironment;
         setNearCookie('near-env', nearEnv);
      }
   }, []);

   return (
      <NearEnvironmentContext.Provider
         value={{
            value: nearEnv as NearEnvironment,
            update: (v: NearEnvironment) => {
               setNearCookie('near-env', v);
               window.location.reload();
            },
            isProvided: true,
         }}
      >
         {children}
      </NearEnvironmentContext.Provider>
   );
};

export default NearEnvironmentProvider;
