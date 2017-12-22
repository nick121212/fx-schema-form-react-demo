import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Component as CreateComponent } from "./create";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return [
            <Route key="panel-create" path="/panel/create" component={CreateComponent} />,
        ];
    }
}

