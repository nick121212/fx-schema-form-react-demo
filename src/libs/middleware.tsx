import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import his, { createBrowserHistory, createHashHistory, History } from "history";

import proxy from "./proxy";
import mpMiddleware from "../common/middlewares/proxy";
import msgMiddleware from "../common/middlewares/message";
import noneMiddleware from "../common/middlewares/none";

let logger;
/**
 * logger中间件
 */
if (__PROD__ || __STAG__) {
    logger = noneMiddleware();
} else {
    logger = createLogger({
        collapsed: true,
        duration: true,
        stateTransformer: (state) => {
            return state.toJS();
        }
    });
}

/**
 * saga中间件
 * 用于处理action产生的不良影响
 */
export const sagaMiddleware = createSagaMiddleware();

/**
 * 合并中间件
 * thunk -> router -> promise -> msg -> proxy -> saga -> logger -> promise
 */
export default (history: any) => applyMiddleware(
    thunk,
    routerMiddleware(history),
    promise,
    mpMiddleware({ proxy }),
    sagaMiddleware,
    msgMiddleware()
)(createStore);
