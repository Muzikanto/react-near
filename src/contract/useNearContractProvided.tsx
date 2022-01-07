import React from 'react';
import { NearContractContext } from './NearContractProvider';

function useNearContractProvided() {
    const ctx = React.useContext(NearContractContext);

    return ctx.contract;
}

export default useNearContractProvided;