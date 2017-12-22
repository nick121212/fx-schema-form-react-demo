import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ComponentWithHoc as MainLayoutComponent } from "./content";
import { ComponentWithHoc as HeadComponent } from "./head";
import { ComponentWithHoc as FooterComponent } from "./footer";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return [
            <Route key="main-head" component={HeadComponent} />,
            <Route key="main-content" component={MainLayoutComponent} />,
            <Route key="main-footer" component={FooterComponent} />
        ];
    }
}

