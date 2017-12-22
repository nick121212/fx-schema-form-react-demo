import React from "react";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC, hocFactory } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { compose, shouldUpdate } from "recompose";
import { ExtraFieldHocOutProps } from "../hocs/field";
import { globalOptions as globalAllOptions } from "../index";

export interface DesignFieldProps extends SchemaFormItemProps, ExtraFieldHocOutProps {

}

/**
 * 数组字段的生成规则
 * 用于
 */
@(shouldUpdate(() => false) as any)
@(compose(connect(mapFormItemDataProps)) as any)
export class DesignField extends React.PureComponent<DesignFieldProps, any> {
    /**
     * 遍历数据，生成子表单
     * @param idx 数组的索引
     */
    private renderItem(idx: number): JSX.Element {
        const { mergeSchema, schemaKey, globalOptions, schemaFormOptions,
            getCurrentState, ItemChildButtons, arrayLevel = [], arrayIndex, currentTheme, formItemData,
            getFieldOptions, reducerKeys } = this.props;
        const { uiSchema, keys } = mergeSchema;
        const { data = {} } = formItemData;

        return (
            <SchemaForm
                key={keys.concat([idx]).join("/")}
                arrayIndex={idx}
                schemaFormOptions={schemaFormOptions}
                schemaKey={schemaKey}
                reducerKeys={reducerKeys}
                arrayLevel={arrayLevel.concat([idx])}
                schema={mergeSchema}
                parentKeys={mergeSchema.originKeys}
                RootComponent={({ children }) => {
                    return children;
                }}
                uiSchema={[{ key: mergeSchema.originKeys.concat(["infoOptions/-"]).join("/") }]}
                globalOptions={globalOptions}>
            </SchemaForm>
        );
    }

    /**
     * 渲染页面
     */
    public render(): any {
        const { children, formItemData, getFormItemData, arrayLevel, reducerKeys, getFieldOptions,
            currentTheme, mergeSchema, arrayIndex, schemaFormOptions, schemaKey, globalOptions } = this.props;
        let child = formItemData && formItemData.get("infoOptions")
            && formItemData.get("infoOptions").map((d: any, idx: number) => {
                return this.renderItem(idx);
            });
        let options = getFormItemData();
        let dataComponent = <span className="dn"
            key={mergeSchema.keys.concat(["data"]).join("data-opt")}>
            <SchemaForm
                arrayIndex={arrayIndex}
                schemaFormOptions={schemaFormOptions}
                schemaKey={schemaKey}
                arrayLevel={arrayLevel}
                reducerKeys={reducerKeys}
                schema={options.edit.schema}
                parentKeys={mergeSchema.originKeys.concat(["data"])}
                uiSchema={options.edit.uiSchema(mergeSchema.originKeys) || ["*"]}
                globalOptions={globalAllOptions}>
            </SchemaForm>
        </span>;

        if (options.uiSchema && options.uiSchema.widget) {
            if (currentTheme.widgetFactory.has(options.uiSchema.widget)) {
                let WidgetComponent = currentTheme.widgetFactory.get(options.uiSchema.widget);

                return [
                    dataComponent,
                    <SchemaForm
                        key={mergeSchema.keys.concat(["data"]).join("widget")}
                        arrayIndex={arrayIndex}
                        schemaFormOptions={schemaFormOptions}
                        schemaKey={schemaKey}
                        arrayLevel={arrayLevel}
                        reducerKeys={reducerKeys}
                        schema={mergeSchema}
                        parentKeys={mergeSchema.originKeys}
                        RootComponent={getFieldOptions("design").root}
                        uiSchema={[{
                            key: mergeSchema.originKeys.concat(["data"]).join("/"),
                            field: "string",
                            widget: options.uiSchema.widget
                        }]}
                        globalOptions={globalOptions}>
                    </SchemaForm>
                ];
            }
        }

        return [children, child || null, dataComponent];
    }
}
