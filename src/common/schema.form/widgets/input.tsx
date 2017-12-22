import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import { TextField } from "office-ui-fabric-react/lib/TextField";

export interface TextBoxWidgetProps extends SchemaFormItemProps {
}

export class TextBoxWidget extends React.Component<TextBoxWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions("text");

        return <TextField
            onChanged={(val: string) => {
                updateItemData(val);
            }}
            onBlur={(e: any) => {
                updateItemMeta(e.target.value);
            }}
            placeholder={getTitle()}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            props.value = this.props.formItemData;
        } else {
            props.value = "";
        }

        return props;
    }
}
