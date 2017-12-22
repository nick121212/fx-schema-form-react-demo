


import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator } from "redux-act";
import { Reducer } from "redux";
import Immutable from "immutable";

export interface MessageReducerModel {
    messages: any[];
}

export interface MessageModel {
    message: string;
    interval: number;
}

/**
 * 分页的reducer
 * actions
 */
export class MessageReducer<T> {
    private isInit = false;

    private addMessage: SimpleActionCreator<MessageModel> = createAction<MessageModel>("添加消息");
    private removeMessage: SimpleActionCreator<MessageModel> = createAction<MessageModel>("删除消息");

    /**
     * 构造函数
     * @param initialState state的初始值
     */
    constructor(protected initialState: any) { }

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            add: this.addMessage,
            remove: this.removeMessage,
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.addMessage as any]: (state: Immutable.Map<string, any>, data: MessageModel) => {
                let messages = state.get("messages");

                messages = messages.push(data);

                return state.set("messages", messages);
            },
            [this.removeMessage as any]: (state: Immutable.Map<string, any>, data: MessageModel) => {
                return state;
            }
        }, this.initialState);
    }
}
