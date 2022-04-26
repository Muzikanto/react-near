import React from 'react';
import { NearEnvironment } from '../index';

export interface NearEnvironmentContextType {
   value: NearEnvironment;
   update: (value: NearEnvironment) => void;
   isProvided?: boolean;
}

export type NearEnvironmentProviderProps = {
   environment?: NearEnvironment;
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
   environment = NearEnvironment.TestNet,
   children,
}) => {
   const [value, setValue] = React.useState<NearEnvironment>(environment);

   return (
      <NearEnvironmentContext.Provider
         value={{
            value,
            update: (v) => setValue(v),
            isProvided: true,
         }}
      >
         {children}
      </NearEnvironmentContext.Provider>
   );
};

export default NearEnvironmentProvider;
