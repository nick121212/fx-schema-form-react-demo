
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
    SchemaFormItemBaseProps, RC, UtilsHocOutProps, SchemaFormItemProps
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps, mapFormDataToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { ConditionHocOutProps } from "./condition";
import { BaseComponent } from "../../component/index";

export interface ShHocOutProps extends SchemaFormItemProps, UtilsHocOutProps, ConditionHocOutProps {
    actions: any;
}

export interface ShHocOutSettings {
    path: string;
    proxyInfo?: any;
}

/**
 * dsmodel包装器
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: ShHocOutSettings = { path: "", proxyInfo: {} }) => {
    return (Component: any): RC<ShHocOutProps, any> => {
        @(onlyUpdateForKeys(["condition"]) as any)
        @connect(mapFormItemDataProps)
        class ComponentHoc extends BaseComponent<ShHocOutProps, any> {

            private getProxyData(id: number) {
                let proxy = this.props.getHocOptions("proxy").proxy;
                let proxyInfo = settings.proxyInfo;

                return proxy.execute(proxyInfo.ns, proxyInfo.key, {
                    params: {
                        dsModelId: id,
                        shopId: "1000000"
                    }
                });
            }

            private async getModelData() {
                let { getPathKeys, mergeSchema, condition, actions, formItemData, updateItemData } = this.props;
                let { path = null } = settings || {};
                let { keys } = mergeSchema;

                if (!path) {
                    return;
                }

                let data = condition.getIn(getPathKeys(keys, path));

                if (!data) {
                    return;
                }

                data = data.toJS();

                formItemData.get("ids").mapKeys((k: string) => {
                    if (data.indexOf(Number(k)) < 0) {
                        let idInfo = formItemData.getIn(["ids", k]);

                        formItemData = formItemData.removeIn(["ids", k]);
                        formItemData = formItemData.removeIn(["data", idInfo.get("key")]);
                    }
                });

                while (data.length) {
                    let id = data.pop();

                    if (id) {
                        if (!formItemData.hasIn(["ids", id.toString()])
                            || !formItemData.hasIn(["ids", id.toString(), "loaded"])) {
                            try {
                                let proxyInfo = await this.getProxyData(id);

                                formItemData = formItemData.setIn(["ids", id.toString()],
                                    Immutable.fromJS({ loaded: true, key: proxyInfo.key }));
                                formItemData = formItemData.setIn(["data", proxyInfo.key || id.toString()],
                                    Immutable.fromJS(proxyInfo.value));
                            } catch (e) {
                                formItemData = formItemData.setIn(["ids", id.toString()],
                                    Immutable.fromJS({ loaded: false, errorMessage: e.message }));
                            }
                        }
                    }
                }

                updateItemData(formItemData.toJS());
            }

            public componentDidUpdate() {
                this.getModelData();
            }

            public componentDidMount() {
                this.getModelData();
            }

            public render(): JSX.Element {
                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
