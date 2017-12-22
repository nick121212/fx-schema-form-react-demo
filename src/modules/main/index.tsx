import { combineReducers } from "redux-immutable";
export { default as Component } from "./route";
export { rootReducerKey as reducerKey } from "./constant";

import * as content from "./content";
import * as head from "./head";


export const sagas = [...content.sagas, ...head.sagas];
export const reducer = combineReducers({
    // [content.reducerKey]: content.reducer,
    [head.reducerKey]: head.reducer
});
export const actions = [...content.actions, ...head.actions];
