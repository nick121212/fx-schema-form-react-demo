import { combineReducers } from "redux-immutable";
import { messageReducer } from "./constant";
export { ComponentWithHoc as Component } from "./component";
export { rootReducerKey as reducerKey, messageReducer } from "./constant";

export const sagas = [];
export const reducer = messageReducer.reducer;
export const actions = [messageReducer.actions.add, messageReducer.actions.remove];
