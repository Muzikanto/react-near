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
