import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import { DatePicker, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";

export interface DatePickerWidgetProps extends SchemaFormItemProps {
}

export class DatePickerWidget extends React.Component<DatePickerWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions("date");

        return <DatePicker
            onSelectDate={(val: Date) => {
                updateItemData(val.toString());
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
            try {
                props.value = new Date(this.props.formItemData);
            } catch (e) {
                console.error("转换日期失败");
            }
        } else {
            // props.value = "";
        }

        return props;
    }
}
