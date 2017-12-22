
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import { ModelProxy } from "modelproxy";
import merge from "lodash.merge";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import Jsonata from "jsonata";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, ValidateHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";

export interface ProxyHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps,
    UtilsHocOutProps, ValidateHocOutProps {
    proxyInfo: any;
    actions?: any;
}

export interface ProxyHocOutSettings {
    proxy?: ModelProxy;
    ns: string;
    key: string;
    options: IProxyCtx;
    jsonata: string;
    property: string;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<ProxyHocOutProps, any> => {
        @connect(mapMetaStateToProps)
        class ComponentHoc extends React.PureComponent<ProxyHocOutProps, any> {

            public componentDidMount() {
                let { getHocOptions, updateItemMeta, actions, mergeSchema, meta } = this.props;
                let options: ProxyHocOutSettings = merge({}, getHocOptions("proxy"), settings);
                let { keys } = mergeSchema;

                if (meta && meta[options.property]) {
                    return;
                }

                if (!options.ns) {
                    return;
                }

                actions.updateItemMeta({
                    keys,
                    meta: { isLoading: true }
                });
                options.proxy.execute(options.ns, options.key, options.options).then((data) => {
                    if (options.jsonata) {
                        let expression = Jsonata(options.jsonata);

                        try {
                            actions.updateItemMeta({
                                keys,
                                meta: { isLoading: false, [options.property]: expression.evaluate(data) }
                            });
                        } catch (e) {
                            actions.updateItemMeta({
                                keys,
                                meta: { errorText: e.message, isLoading: false, isValid: false }
                            });
                        }
                    }
                }).catch((e: Error) => {
                    actions.updateItemMeta({
                        keys,
                        meta: { errorText: e.message, isLoading: false, isValid: false }
                    });
                });
            }

            public render(): JSX.Element {
                let { getHocOptions, updateItemMeta, actions, mergeSchema, meta } = this.props;
                let options: ProxyHocOutSettings = merge({}, getHocOptions("proxy"), settings);
                let proxyInfo = {};

                if (meta && meta[options.property]) {
                    proxyInfo[options.property] = meta[options.property];
                }

                return <Component {...this.props} proxyInfo={proxyInfo} />;
            }
        }

        return ComponentHoc as any;
    };
};
