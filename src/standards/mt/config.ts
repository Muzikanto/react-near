import { MT_CORE_METHODS } from '../mt-core/config';

const MT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [...MT_CORE_METHODS.viewMethods],
   changeMethods: [...MT_CORE_METHODS.changeMethods],
};

export { MT_METHODS };
