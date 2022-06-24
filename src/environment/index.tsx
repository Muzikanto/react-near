import React from 'react';
import { NearEnvironment } from '../config';
import { getNearCookie, setNearCookie } from '../utils';

export interface NearEnvironmentContextType {
   value: NearEnvironment;
   update: (value: NearEnvironment) => void;
   isProvided?: boolean;
}

export type NearEnvironmentProviderProps = {
   defaultEnvironment?: NearEnvironment;
};

export function useNearEnvironment() {
   const r = React.useContext(NearEnvironmentContext);

   return r;
}

export const NearEnvironmentContext = React.createContext<NearEnvironmentContextType>({
   value: NearEnvironment.TestNet,
   update: () => {},
   isProvided: false,
});

const NearEnvironmentProvider: React.FC<NearEnvironmentProviderProps> = ({
   defaultEnvironment = NearEnvironment.TestNet,
   children,
}) => {
   let nearEnv =
      (typeof window === 'undefined' ? NearEnvironment.TestNet : getNearCookie('near-env')) ||
      NearEnvironment.TestNet;

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
