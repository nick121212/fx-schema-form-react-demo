import { combineReducers } from "redux-immutable";

import * as create from "./create";

export { default as Component } from "./route";
export { rootReducerKey as reducerKey } from "./constant";

export const sagas = [...create.sagas];
export const reducer = combineReducers({
    [create.reducerKey]: create.reducer
});
export const actions = [...create.actions];
