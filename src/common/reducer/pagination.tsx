

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { ModelProxyMiddlewareMeta, ModelProxyAction } from "../middlewares/proxy";
import { Reducer } from "redux";
import { IExecute } from "modelproxy/out/models/execute";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Immutable from "immutable";

export interface PaginationReducerModel {
    total: number;
    curPage?: number;
    pageSize: number;

    totalPage?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
}

/**
 * 分页的reducer
 * actions
 */
export class PaginationReducer<T> {
    private isInit = false;

    private setInfo: SimpleActionCreator<PaginationReducerModel> = createAction<PaginationReducerModel>("设置基础信息");
    private next: EmptyActionCreator = createAction("下一页");
    private prev: EmptyActionCreator = createAction("上一页");

    /**
     * 构造函数
     * @param initialState state的初始值
     */
    constructor(protected initialState: PaginationReducerModel = {
        total: 0,
        curPage: 0,
        pageSize: 10
    }) { }

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            next: this.next,
            prev: this.prev,
            setInfo: this.setInfo
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {

        // if()

        return createReducer<Immutable.Map<string, any>>({
            [this.setInfo as any]: (state: Immutable.Map<string, any>, data: PaginationReducerModel) => {
                if (data.total && data.pageSize) {
                    data.totalPage = Math.ceil(data.total / data.pageSize);
                }

                if (data.totalPage < data.curPage) {
                    data.curPage = data.totalPage;
                }

                return state.merge(data);
            },
            [this.prev as any]: (state: Immutable.Map<string, any>) => {
                let data: PaginationReducerModel = state.toJS();

                if (data.curPage > 0) {
                    data.curPage = data.curPage - 1;
                }

                return state.merge(data);
            },
            [this.next as any]: (state: Immutable.Map<string, any>) => {
                let data: PaginationReducerModel = state.toJS();

                if (data.curPage < data.totalPage - 1) {
                    data.curPage = data.curPage + 1;
                }

                return state.merge(data);
            }
        }, Immutable.Record(this.initialState)());
    }
}
