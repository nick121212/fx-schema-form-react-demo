import Immutable from "immutable";

import { MessageReducer } from "./reducer";

export const rootReducerKey = "message";
export const reducerKeys = ["modules", rootReducerKey];
export const messageReducer = new MessageReducer(Immutable.fromJS({
    messages: []
}));
