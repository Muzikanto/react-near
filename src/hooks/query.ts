import { Contract } from 'near-api-js';
import React from 'react';
import nearClient from '../core/client';

export type NearQueryOptions<Res = any, Req extends { [key: string]: any } = any> = {
  variables?: Req;
  onError?: (err: Error) => void;
  onCompleted?: (res: Res) => void;
  skip?: boolean;
  debug?: boolean;
};

function useNearQuery<Res = any, Req extends { [key: string]: any } = any>(
  contract: Contract | null,
  methodName: string,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Res | null>(null);

  const callMethod = async (args?: Req, useCache = true) => {
    if (contract) {
      if (!(contract as any)[methodName]) {
        if (opts.onError) {
          opts.onError(new Error('Not found contract method'));
        }
        return Promise.reject('Not found contract method');
      }

      const requestId = nearClient.encodeRequest(methodName, args || opts.variables || {});
      const cacheState = nearClient.get(requestId, 'QUERY');

      if (useCache && cacheState) {
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

        nearClient.set(requestId, res, "QUERY");

        setLoading(false);
        return res;
      } catch (e) {
        setLoading(false);

        if (opts.onError) {
          opts.onError(e as Error);
        }

        throw e;
      }
    }

    if (opts.onError) {
      opts.onError(new Error('Not found contract state'));
    }
    return Promise.reject('Not found contract state');
  };

  React.useEffect(() => {
    if (contract && !opts.skip) {
      callMethod()
        .then()
        .catch();
    }
  }, [contract, opts.skip]);

  return { loading, data, refetch: (args?: Req) => callMethod(args, true) };
}

export default useNearQuery;
