import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { connect } from "react-redux";
import ReactEcharts from "echarts-for-react";
import { shouldUpdate } from "recompose";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";

export interface Props extends SchemaFormItemProps {
    actions: any;
}

@(shouldUpdate(() => false) as any)
@connect(mapFormItemDataProps)
export class EChartWidget extends React.PureComponent<Props, any> {
    private echarts_react: any;

    public componentDidCatch(err, info) {
        console.log(err);
    }

    public componentWillUpdate() {
        if (this.echarts_react) {
            let echarts_instance = this.echarts_react.getEchartsInstance();

            echarts_instance.clear();
        }
    }

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, actions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions("code");

        return <ReactEcharts
            ref={(e) => { this.echarts_react = e; }}
            notMerge={false}
            lazyUpdate={false}
            style={{
                height: "100%"
            }}
            className="h-100"
            onChartReady={() => {
                console.log("chart ready");
            }}
            {...widgetOptions}
            {...this.setDefaultProps() } />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        let props: any = {};

        if (this.props.formItemData !== undefined) {
            props = this.props.formItemData.toJS();
        }

        return props;
    }
}
