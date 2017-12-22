import React from "react";
import Immutable from "immutable";
import { RouteComponentProps } from "react-router-dom";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { rootReducerKey } from "../constant";

export const reducerKey = "head";
export const reducerKeys = ["modules", rootReducerKey, reducerKey];
export interface LayoutProps extends RouteComponentProps<any> {
    $user: Immutable.Map<string, any>;
}
export const proxySettings = {
    isLogin: { ns: "sf", key: "isLogin" },
    detail: { ns: "design", key: "infographicDetail" }
};
export const userProxyModel = new ModelProxyReducer();
