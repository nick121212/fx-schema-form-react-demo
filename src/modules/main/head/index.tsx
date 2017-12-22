import { combineReducers } from "redux-immutable";
import { reducerKeys, reducerKey, userProxyModel } from "./constant";

export { ComponentWithHoc } from "./component";

export const reducer = userProxyModel.reducer;
export const sagas = [userProxyModel.saga.bind(userProxyModel)];
export const actions = [userProxyModel.actions.execute];
export {
    reducerKey
};
