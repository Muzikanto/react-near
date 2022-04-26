// @ts-ignore
import cookie from 'cookie';

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
