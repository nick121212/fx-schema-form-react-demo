
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

export interface CustomHocOutProps extends SchemaFormItemBaseProps, UtilsHocOutProps, ConditionHocOutProps {
}

export interface CustomHocOutSettings {
    path: string;
    func: (props: CustomHocOutProps, data: any) => void;
}

/**
 * 控制显示隐藏的hoc
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: CustomHocOutSettings = {
    path: "",
    func: () => console.log()
}) => {
    return (Component: any): RC<CustomHocOutProps, any> => {
        class ComponentHoc extends BaseComponent<CustomHocOutProps, any> {
            public render(): JSX.Element {
                const { getPathKeys, mergeSchema, condition } = this.props;
                const { path = null, func = () => console.log() } = settings || {};
                const { keys } = mergeSchema;

                if (!path) {
                    return <Component {...this.props} />;
                }

                let keys1 = getPathKeys(keys, path);
                let data = condition.getIn(keys1);

                func(this.props, data);

                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
