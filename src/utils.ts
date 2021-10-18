export function getNearError(e: any) {
   try {
      return String(e).split('panic_msg: "')[1].split('" }')[0];
   } catch (e2) {
      // @ts-ignore
      return e.message || String(e);
   }
}
