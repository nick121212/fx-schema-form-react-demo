
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import merge from "lodash.merge";
import Immutable from "immutable";
import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";

export interface ExtraFieldHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps {
    getFormItemData?: () => any;
}

/**
 * 特殊的field hoc
 * 这里更改了uiSchema的配置，来实现动态更改字段显示方式的功能
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<ExtraFieldHocOutProps, any> => {
        @connect(mapFormItemDataProps)
        @(shouldUpdate(() => false) as any)
        class ComponentHoc extends React.PureComponent<ExtraFieldHocOutProps, any> {
            private getFormItemData() {
                const { formItemData, getHocOptions } = this.props;
                const itemOptions = getHocOptions("extraField");

                if (Immutable.Map.isMap(formItemData)) {
                    merge(itemOptions, formItemData.toJS());
                }

                if (itemOptions.label && itemOptions.widgets) {
                    merge(itemOptions, itemOptions.widgets[itemOptions.label] || {});
                }

                return itemOptions;
            }

            public render(): JSX.Element {
                const { mergeSchema, currentTheme, formItemData } = this.props;
                const options = this.getFormItemData();

                if (options.uiSchema) {
                    mergeSchema.uiSchema = Object.assign({}, options.uiSchema, mergeSchema.uiSchema);
                }

                return <Component {...this.props} getFormItemData={this.getFormItemData.bind(this)} />;
            }
        }

        return ComponentHoc as any;
    };
};
