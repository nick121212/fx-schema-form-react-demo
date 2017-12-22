

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { ModelProxyMiddlewareMeta, ModelProxyAction } from "../middlewares/proxy";
import { Reducer } from "redux";
import { IExecute } from "modelproxy/out/models/execute";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Immutable from "immutable";

export interface ConfirmReducerModel {
    confirm: boolean;
    item: any;
}

/**
 * 确认框的reducer
 * actions
 */
export class ConfirmReducer<T> {
    private isInit = false;

    private confirmAction: SimpleActionCreator<ConfirmReducerModel> = createAction<ConfirmReducerModel>("确认消息");

    /**
     * 构造函数
     * @param initialState state的初始值
     */
    constructor(protected initialState: ConfirmReducerModel = {
        confirm: false,
        item: null
    }) { }

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            confirm: this.confirmAction
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.confirmAction as any]: (state: Immutable.Map<string, any>,
                { confirm, item }: ConfirmReducerModel) => {
                return state.merge({
                    confirm: confirm,
                    item: item
                });
            }
        }, Immutable.Record(this.initialState)());
    }
}
