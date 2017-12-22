
import React from "react";
import { compose, shouldUpdate, ComponentEnhancer, onlyUpdateForKeys } from "recompose";
import { connect } from "react-redux";
import { ModelProxy } from "modelproxy";
import merge from "lodash.merge";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import Jsonata from "jsonata";
import Immutable from "immutable";
import jpp from "json-pointer";

import {
    SchemaFormItemBaseProps, RC, UtilsHocOutProps
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps, mapFormDataToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { ConditionHocOutProps } from "./condition";
import { BaseComponent } from "../../component/index";

export interface ShHocOutProps extends SchemaFormItemBaseProps, UtilsHocOutProps, ConditionHocOutProps {
}

export interface ShHocOutSettings {
    path: string;
    jsonata?: string;
}

/**
 * 控制显示隐藏的hoc
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: ShHocOutSettings = { path: "", jsonata: "" }) => {
    return (Component: any): RC<ShHocOutProps, any> => {
        // @(onlyUpdateForKeys(["condition"]) as any)
        class ComponentHoc extends BaseComponent<ShHocOutProps, any> {
            public render(): JSX.Element {
                const { getPathKeys, mergeSchema, condition } = this.props;
                const { path = null, jsonata = null } = settings || {};
                const { keys } = mergeSchema;

                if (!path || !jsonata) {
                    return <Component {...this.props} />;
                }

                let keys1 = getPathKeys(keys, path);
                let exp = Jsonata(jsonata);

                if (exp.evaluate(condition.getIn(keys1))) {
                    return <Component {...this.props} />;
                }

                return null;
            }
        }

        return ComponentHoc as any;
    };
};
