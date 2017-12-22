import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class NoneTemp extends React.Component<DivTempProps, any> {
    public render(): any {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions.call(this, tempKey);

        return children;
    }
}
