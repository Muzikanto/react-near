import { FT_CORE_METHODS } from '../ft-core/config';

const FT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [...FT_CORE_METHODS.viewMethods],
   changeMethods: [...FT_CORE_METHODS.changeMethods],
};

export { FT_METHODS };
