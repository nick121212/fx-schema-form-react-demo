import React from "react";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC, hocFactory } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { compose, shouldUpdate } from "recompose";

export interface ObjectFieldProps extends SchemaFormItemProps {

}

// @(shouldUpdate(() => false) as any)
export class ObjectField extends React.PureComponent<ObjectFieldProps, any> {
    public render(): JSX.Element {
        const { mergeSchema, currentTheme, WidgetComponent, arrayIndex, ItemButtons, arrayLevel,
             globalOptions, schemaFormOptions, schemaKey, getFieldOptions, reducerKeys } = this.props;
        const { uiSchema } = mergeSchema;

        return (
            <SchemaForm
                arrayIndex={arrayIndex}
                schemaFormOptions={schemaFormOptions}
                schemaKey={schemaKey}
                arrayLevel={arrayLevel}
                reducerKeys={reducerKeys}
                schema={mergeSchema}
                parentKeys={mergeSchema.originKeys}
                RootComponent={getFieldOptions("object").root}
                uiSchema={uiSchema.items || ["*"]}
                globalOptions={globalOptions}>
            </SchemaForm>
        );
    }
}
