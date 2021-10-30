import React from 'react';
import nearClient from '../core/client';
import useNearContractProvided from '../core/contract-provided';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
  variables?: Req;
  onError?: (err: Error) => void;
  onCompleted?: (res: Res) => void;
  skip?: boolean;
  debug?: boolean;
  useCache?: boolean;
};

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
  methodName: string,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = useNearContractProvided();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Res | undefined>(undefined);

  const callMethod = async (args?: Req, useCache?: boolean) => {
    if (contract) {
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

      const requestId = nearClient.encodeRequest(methodName, args || opts.variables || {});
      const cacheState = nearClient.get(requestId, 'QUERY') as Res;

      if (
        (typeof useCache === 'undefined' ? (typeof opts.useCache === 'undefined' ? true : opts.useCache) : useCache) &&
        cacheState
      ) {
        setData(cacheState);

        return cacheState as Res;
      }

      setLoading(true);

      try {
        // @ts-ignore
        const res = await contract[methodName](args || opts.variables);

        if (opts.debug) {
          console.log(`NEAR #${methodName}`, res);
        }

        setData(res);

        if (opts.onCompleted) {
          opts.onCompleted(res);
        }

        nearClient.set(requestId, res, 'QUERY');

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
    }

    const err = new Error('Contract is not provided');

    if (opts.onError) {
      opts.onError(err);
    }
    if (opts.debug) {
      console.log(`NEAR #${methodName} Error!`, err);
    }

    return Promise.reject(err);
  };

  React.useEffect(() => {
    if (contract && !opts.skip) {
      callMethod()
        .then()
        .catch();
    }
  }, [contract, methodName, opts.skip]);

  return { loading, data, refetch: (args?: Req) => callMethod(args, true) };
}

export default useNearQuery;
