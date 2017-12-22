import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { initializeIcons } from "@uifabric/icons";

import { store } from "./libs/store";
import routes from "./libs/router";

import "./common/schema.form";

initializeIcons();
ReactDOM.render(
    <Provider store={store} >
        {routes}
    </Provider> as JSX.Element,
    document.getElementById("root"),
    () => {
        // console.clear();
    });
