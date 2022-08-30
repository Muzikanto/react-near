// @ts-ignore
import cookie from 'cookie';
import {formatNearAmount} from 'near-api-js/lib/utils/format';

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

/**
 * Removes commas from the input
 * @param amount A value or amount that may contain commas
 * @returns string The cleaned value
 */
function cleanupAmount(amount: string) {
   return amount.replace(/,/g, '').trim();
}
/**
 * Removes leading zeroes from an input
 * @param value A value that may contain leading zeroes
 * @returns string The value without the leading zeroes
 */
function trimLeadingZeroes(value: string) {
   value = value.replace(/^0+/, '');
   if (value === '') {
      return '0';
   }
   return value;
}

export function parseNearAmount(value: string | number, decimals: number = 24): string {
   let amt = value.toString();

   if (!amt) {
      return '0';
   }

   amt = cleanupAmount(amt);

   const split = amt.split('.');
   const wholePart = split[0];
   const fracPart = split[1] || '';

   if (split.length > 2 || fracPart.length > decimals) {
      throw new Error(`Cannot parse '${amt}' as NEAR amount`);
   }
   return trimLeadingZeroes(wholePart + fracPart.padEnd(decimals, '0'));
}
