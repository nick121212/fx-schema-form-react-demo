import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { connect } from "react-redux";
import { shouldUpdate, compose, onlyUpdateForKeys } from "recompose";
import isEqual from "lodash.isequal";
import { mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";

export interface FormItemTempProps extends SchemaFormItemProps {
    tempKey: string;
}

@(compose(shouldUpdate(() => false),
    connect(mapMetaStateToProps),
    shouldUpdate((curProps: SchemaFormItemProps, nextProps: SchemaFormItemProps) => {
        return !isEqual(curProps.meta, nextProps.meta);
    })) as any)
export class FormItemTemp extends React.Component<FormItemTempProps, any> {
    public render(): JSX.Element {
        const { children, arrayIndex, ItemButtons, mergeSchema, globalOptions = {}, tempKey, uiSchemaOptions,
            meta = { dirty: false, isValid: true, isLoading: false }, getTitle
        } = this.props;
        let { dirty = false, isValid = true, errorText = "", isLoading = false } = meta || {};
        let ItemButtonsComponent: JSX.Element = ItemButtons ? <ItemButtons /> :
            <h4 className="ma1 pa0">{getTitle() || [].concat(mergeSchema.keys).pop()}</h4>;
        // if (dirty) {
        //     props.validateStatus = !isValid ? "error" : "success";
        // }

        // if (isLoading) {
        //     props.validateStatus = "validating";
        // }

        return (
            <div className="ma1">
                <label className="f6 b db mb2">
                    {ItemButtonsComponent}
                    {mergeSchema.isRequired ? <span className="normal black-60">(required)</span> : null}
                </label>
                {children}
                {mergeSchema.description ?
                    <small id="name-desc" className="f6 black-60 db mb2">{mergeSchema.description}</small> : null}
                {isValid ? null : <small id="name-desc" className="f6 red db mb2">{errorText}</small>}
            </div>
        );
    }
}
