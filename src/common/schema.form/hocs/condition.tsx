
import React from "react";
import { compose, shouldUpdate, ComponentEnhancer } from "recompose";
import { connect } from "react-redux";
import Jsonata from "jsonata";
import Immutable from "immutable";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, ValidateHocOutProps, conFactory } from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps, mapFormDataToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";
import { createSelector } from "reselect";

export interface ConditionHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps {
    condition?: Immutable.Map<string, any>;
}

export interface ConditionPath {
    path: string;
    jsonata?: string;
}

export interface ConditionHocOutSettings {
    paths?: ConditionPath[];
    hoc?: ComponentEnhancer<any, any>;
}

/**
 * condition
 * 筛选出需要使用的字段，包装到condition这个prop中，传递到下层组件
 * 配置：
 *  paths：字段的路径以及数据处理规则，路径使用相对或者决定路径
 *  hoc：   下层的包装组件
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: ConditionHocOutSettings = { paths: [] }) => {
    let defaultCON = conFactory.get("default");
    return (Component: any): RC<ConditionHocOutProps, any> => {
        class ComponentHoc extends React.Component<ConditionHocOutProps, any> {
            public render(): JSX.Element {
                const { getPathKeys, mergeSchema } = this.props;
                const { paths, hoc } = settings;
                const { keys } = mergeSchema;
                let ComponentWithHoc = Component;

                if (paths && paths.length && hoc) {
                    /**
                     * 从state中获取所有的数据
                     * 根据配置来筛选出配置中的字段
                     */
                    let con = createSelector([defaultCON.getAllData.bind(defaultCON)], (formData: any) => {
                        let rtns: Immutable.Map<string, any> = Immutable.fromJS({});

                        paths.forEach((path: ConditionPath) => {
                            let keys1 = getPathKeys(keys, path.path);
                            let val = formData.getIn(keys1);
                            let exp = Jsonata(path.jsonata || "$$");

                            try {
                                rtns = rtns.setIn(keys1, exp.evaluate(val));
                            } catch (e) {
                                console.log(e);
                            }
                        });

                        return {
                            condition: rtns
                        };
                    });

                    ComponentWithHoc = compose(connect(con), hoc)(Component);
                }

                return <ComponentWithHoc {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
