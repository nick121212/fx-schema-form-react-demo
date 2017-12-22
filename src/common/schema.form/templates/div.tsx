import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class DivTemp extends React.Component<DivTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions.call(this, tempKey);

        return <div {...tempOptions} className={classNames("relative div", className)}>
            {children}
        </div>;
    }
}
