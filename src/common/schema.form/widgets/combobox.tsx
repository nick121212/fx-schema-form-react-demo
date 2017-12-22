import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import {
    ComboBox,
    IComboBoxProps,
    IComboBoxOption,
    VirtualizedComboBox
} from "office-ui-fabric-react/lib/ComboBox";

import { ProxyHocOutProps } from "../hocs/proxy";

export interface ComboBoxWidgetProps extends SchemaFormItemProps, ProxyHocOutProps {
}

export class ComboBoxWidget extends React.Component<ComboBoxWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, proxyInfo = {} } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;
        const { onChanged, ...widgetOptions } = getWidgetOptions("combobox");

        return <ComboBox
            onChanged={(option: IComboBoxOption, index: number, value: string) => {
                if (index !== undefined) {
                    updateItemData(option.key);
                    updateItemMeta(option.key);
                }

                if (onChanged) {
                    onChanged(this.props, option, index, value);
                }
            }}
            placeholder={getTitle()}
            disabled={readonly}
            {...proxyInfo}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            props.selectedKey = this.props.formItemData;
        } else {
            // props.value = "";
        }

        return props;
    }
}
