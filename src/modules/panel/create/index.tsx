import { combineReducers } from "redux-immutable";
import { PanelComponent } from "../../../common/widgets/index";
import { updateProxyModel, reducerKey, schemaFormModel, formOptions } from "./constant";

export { Component } from "./component";
export { reducerKey } from "./constant";
export const reducer = combineReducers({
    $updateProxyModel: updateProxyModel.reducer,
    [formOptions.schemaKey]: schemaFormModel.reducer
});

export const actions = [
    updateProxyModel.actions.execute,
    // schemaFormModel.
];
export const sagas = [
    updateProxyModel.saga.bind(updateProxyModel)
];
