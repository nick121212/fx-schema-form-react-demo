import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
// import { Flex, Box } from "grid-styled";
import classNames from "classnames";

export interface RowTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class RowTemp extends React.Component<RowTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions.call(this, tempKey);

        return (
            <div {...tempOptions} className={classNames("ms-Grid-row relative pa0 ma0", className)}>
                {children}
            </div>
        );

    }
}
