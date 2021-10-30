import React from 'react';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useNearAccount } from './index';
import { NEAR_GAS } from '../config';
import useNearContractProvided from '../core/contract-provided';

export type NearMutationOptions<Res = any, Req extends { [key: string]: any } = any> = {
  onError?: (err: Error) => void;
  onCompleted?: (res: Res) => void;
  debug?: boolean;
  gas?: number;
};

function useNearMutation<Res = any, Req extends { [key: string]: any } = any>(
  methodName: string,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = useNearContractProvided();
  const account = useNearAccount();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Res | null>(null);

  const callMethod = async (args: Req, attachedDeposit?: number) => {
    if (!account) {
      const err = new Error('Not found contract account');

      if (opts.debug) {
        console.log(`NEAR #${methodName} Error!`, err);
      }
      if (opts.onError) {
        opts.onError(err);
      }

      return Promise.reject(err);
    }

    if (!contract) {
      const err = new Error('Not found contract state');

      if (opts.debug) {
        console.log(`NEAR #${methodName} Error!`, err);
      }
      if (opts.onError) {
        opts.onError(err);
      }

      return Promise.reject(err);
    }

    if (!(contract as any)[methodName]) {
      const err = new Error('Not found contract method');

      if (opts.onError) {
        opts.onError(err);
      }
      if (opts.debug) {
        console.log(`NEAR #${methodName} Error!`, err);
      }

      return Promise.reject(err);
    }

    setLoading(true);

    try {
      let res: any;

      if (attachedDeposit || opts.gas) {
        res = await account.functionCall(
          contract.contractId,
          methodName,
          args,
          (opts.gas || NEAR_GAS) as any,
          (attachedDeposit ? parseNearAmount(attachedDeposit.toString()) : undefined) as any
        );
      } else {
        // @ts-ignore
        res = await contract[methodName](args);
      }

      if (opts.debug) {
        console.log(`NEAR #${methodName}`, res);
      }

      setData(res);

      if (opts.onCompleted) {
        opts.onCompleted(res);
      }

      setLoading(false);
      return res;
    } catch (e) {
      setLoading(false);

      if (opts.debug) {
        console.log(`NEAR #${methodName} Error!`, e);
      }

      if (opts.onError) {
        opts.onError(e as Error);
      }

      throw e;
    }
  };

  return [callMethod, { loading, data }] as const;
}

export default useNearMutation;
