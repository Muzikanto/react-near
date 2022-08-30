// @ts-ignore
import cookie from 'cookie';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

export function getNearError(e: any) {
   try {
      if (e.kind && typeof e.kind.ExecutionError === 'string') {
         return e.kind.ExecutionError.split(', filename')[0];
      }

      return String(e).split('panic_msg: "')[1].split('" }')[0];
   } catch (e2) {
      // @ts-ignore
      return e.message || String(e);
   }
}

export const setNearCookie = (path: string, value: string, opts: { maxAge?: number } = {}) => {
   document.cookie = cookie.serialize(path, value, {
      maxAge: opts.maxAge, // 30 minutes
      path: '/',
   });
};

export const getNearCookie = (key: string) => {
   let parsed: { [key: string]: string } = cookie.parse(document.cookie);

   return parsed[key];
};

export const NEAR_ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

export function isValidNearAddress(address: string): boolean {
   return NEAR_ACCOUNT_ID_REGEX.test(address);
}

//

export function formatNearPrice(price: string, decimals: number = 24): number {
   if (decimals === 0) {
      return +price;
   }

   return +(+formatNearAmount(price, decimals).split(',').join(''));
}

export function parseNearAmount(value: number, decimals: number = 24): string {
   return BigInt(Number(value) * decimals).toString();
}
