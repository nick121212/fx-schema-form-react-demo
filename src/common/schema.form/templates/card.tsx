import React from "react";
import { connect } from "react-redux";
import { shouldUpdate, compose, onlyUpdateForKeys } from "recompose";
import isEqual from "lodash.isequal";
import { mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { SchemaFormItemProps, ArrayHocOutProps } from "fx-schema-form-react";

export interface CardTempProps extends SchemaFormItemProps, ArrayHocOutProps {
    tempKey: string;
}

@(compose(
    connect(mapMetaStateToProps),
    shouldUpdate((curProps: SchemaFormItemProps, nextProps: SchemaFormItemProps) => {
        // if (!curProps.meta || !nextProps.meta) {
        //     return !isEqual(curProps.meta, nextProps.meta);
        // }

        // return curProps.meta.isValid !== nextProps.meta.isValid;
        return true;
    })) as any)
export class CardTemp extends React.Component<CardTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, ItemButtons,
            getTitle, meta } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});
        const { uiSchema, title } = mergeSchema;
        let { dirty = false, isValid = true, errorText = "", isShow = true } = meta || {};
        let ItemButtonsComponent: JSX.Element = ItemButtons ? <ItemButtons /> :
            <h4 className="ma1 pa0">{getTitle()}</h4>;

        return (
            <div className={"ma1 ba b--dashed"}>
                {ItemButtonsComponent}
                {mergeSchema.description ? <small className="f7 black db moon-gray ma1">
                    {mergeSchema.description}</small> : null}
                <span style={{
                    display: isShow ? "block" : "none",
                    height: "100%"
                }}>
                    {children}
                </span>
                {isValid ? null : <small className="f6 red db mb2">{errorText}</small>}
            </div>
        );
    }
}
