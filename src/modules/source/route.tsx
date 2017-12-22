import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Component as CreateComponent } from "./create";

// import { ComponentWithHoc as HeadComponent } from "./head";
// import { ComponentWithHoc as FooterComponent } from "./footer";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return [
            <Route key="source-create" path="/source/create" component={CreateComponent} />,
        ];
    }
}

