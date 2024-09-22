import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./models";

const {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
  useStore,
} = createTypedHooks<StoreModel>();

export { useStore, useStoreActions, useStoreState, useStoreDispatch};
