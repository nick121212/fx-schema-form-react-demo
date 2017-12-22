import React from "react";
import Immutable from "immutable";
import { RouteComponentProps } from "react-router-dom";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { rootReducerKey } from "../constant";

export const reducerKey = "content";
export const reducerKeys = ["modules", rootReducerKey, reducerKey];
export interface LayoutProps extends RouteComponentProps<any> {
}

export const $InitialState = Immutable.fromJS(
    [{
        title: "数据源",
        description: "数据源的配置",
        icon: "Database",
        link: "/source/create"
    }, {
        title: "面板",
        description: "面板的配置，修改",
        icon: "SidePanel",
        link: "/panel/create"
    }]
);
