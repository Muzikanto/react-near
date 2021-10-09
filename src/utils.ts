export function getNearError(e: any): string {
   try {
      return e.kind.ExecutionError.split(', filename')[0];
   } catch (err) {
      return e.message;
   }
}
