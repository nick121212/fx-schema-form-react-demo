import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import { TextField } from "office-ui-fabric-react/lib/TextField";

export interface Props extends SchemaFormItemProps {
}

export class NumberWidget extends React.Component<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions("text");

        return <TextField
            onChanged={(val: any) => {
                if (!val) {
                    return updateItemData("undefined");
                }
                updateItemData(val * 1);
            }}
            onBlur={(e: any) => {
                updateItemMeta(1 * e.target.value);
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
            props.value = this.props.formItemData.toString();
        } else {
            // props.value = 0;
        }

        return props;
    }
}
