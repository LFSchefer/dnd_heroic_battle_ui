import { createTypedHooks } from "easy-peasy";
import { StoreModel } from ".";

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;