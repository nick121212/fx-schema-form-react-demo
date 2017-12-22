
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import merge from "lodash.merge";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";
import { ExtraFieldHocOutProps } from "./field";

export interface ExtraTempHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps,
    ExtraFieldHocOutProps, UtilsHocOutProps {

}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {
    temp: "",
    children: null
}) => {
    return (Component: any): RC<ExtraTempHocOutProps, any> => {
        @(shouldUpdate(() => false) as any)
        @connect(mapMetaStateToProps)
        @connect(mapFormItemDataProps)
        class ComponentHoc extends React.PureComponent<ExtraTempHocOutProps, any> {
            /**
             * render
             */
            public render(): any {
                const { currentTheme, mergeSchema, formItemData, globalOptions, children, meta } = this.props;
                const { uiSchema } = mergeSchema;
                const tempOptions = this.props.getHocOptions("extraTemp");
                let { formItemData: formMetaItemData = {} } = meta || {};

                if (uiSchema["ui:temp"]) {
                    let copyData = formItemData.get("data").toJS();
                    let options = this.props.getFormItemData();

                    if (tempOptions.design) {
                        if (!copyData.className) {
                            copyData.className = "";
                        }

                        copyData.className += " " + options.design.className;
                    }

                    uiSchema["ui:temp"].forEach(temp => {
                        merge(uiSchema, {
                            options: {
                                [temp]: merge(copyData, formMetaItemData)
                            }
                        });
                    });
                }

                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
