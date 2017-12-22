import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import { EmptyActionCreator } from "redux-act";
import { reducer as toastrReducer } from "react-redux-toastr";

import { historyInstance } from "./router";
import applyMiddlewares, { sagaMiddleware } from "./middleware";
import reactRouterReducer from "./router.reducer";

import * as main from "../modules/main";
import * as panel from "../modules/panel";
import * as source from "../modules/source";
import * as message from "../modules/message";

/**
 * 合并reducers
 */
let reducers = combineReducers({
    modules: combineReducers({
        [main.reducerKey]: main.reducer,
        [panel.reducerKey]: panel.reducer,
        [source.reducerKey]: source.reducer,
        [message.reducerKey]: message.reducer
    }),
    routing: reactRouterReducer,
    toastr: toastrReducer
});

/**
 * 创建store对象
 */
export const store = applyMiddlewares(historyInstance)(reducers, Immutable.Map());

/**
 * 使用了Immutable，这里对react-router-redux特殊处理下
 */
export const history = syncHistoryWithStore(historyInstance as any, store, {
    selectLocationState(state: Immutable.Map<string, any>) {
        return state.get("routing").toJS();
    }
});

/**
 * saga实例方法加载
 */
[...source.sagas, ...main.sagas, ...panel.sagas,  ...message.sagas].forEach((saga) => {
    sagaMiddleware.run(saga);
});

/**
 * 初始化action，与store绑定
 */
[...source.actions, ...main.actions, ...panel.actions, ...message.actions].forEach((action: EmptyActionCreator) => {
    action.assignTo(store);
});
