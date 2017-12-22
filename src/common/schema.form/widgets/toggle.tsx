import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Toggle, IToggleProps } from "office-ui-fabric-react/lib/Toggle";

export interface ToggleProps extends SchemaFormItemProps {
}

export class ToggleWidget extends React.Component<ToggleProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, arrayIndex, globalOptions,
            uiSchemaOptions, getWidgetOptions, updateItemMeta, updateItemData } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <Toggle label={mergeSchema.title}
                onChanged={(checked: boolean) => {
                    updateItemData(checked);
                    updateItemMeta(checked);
                }}
                readonly={readonly}
                {...getWidgetOptions("toggle") }
                {...this.setDefaultProps() } />
        );
    }

    private setDefaultProps(): IToggleProps {
        const { mergeSchema } = this.props;
        const props: IToggleProps = {};

        if (this.props.formItemData !== undefined) {
            props.checked = this.props.formItemData;
            // props.defaultToggled = this.props.formItemData;
        } else {
            // props.defaultToggled = mergeSchema.default;
        }

        return props;
    }
}
