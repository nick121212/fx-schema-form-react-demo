
import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { ProxyHocOutProps } from "../hocs/proxy";

export interface ChoiceGroupWidgetProps extends SchemaFormItemProps, ProxyHocOutProps {
}

export class ChoiceGroupWidget extends React.Component<ChoiceGroupWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, proxyInfo = {} } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { onChange, ...widgetOptions } = getWidgetOptions("choice");

        return <ChoiceGroup
            onChange={(ev: any, option: IChoiceGroupOption) => {
                updateItemData(option.key);
                updateItemMeta(option.key);

                if (onChange) {
                    onChange(this.props, option);
                }
            }}
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
