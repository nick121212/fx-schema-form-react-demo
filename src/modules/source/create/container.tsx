import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";
import { SchemaFormCreate } from "fx-schema-form-react";
import { toastr } from "react-redux-toastr";
import {
    reducerKey, reducerKeys, SourceCreatePropsRaw, SourceCreateProps,
    updateProxyModel, proxySettings, formOptions, schemaFormModel, $InitialState
} from "./constant";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any): SourceCreatePropsRaw => {
    return {
        $updateProxyModel: state.getIn(reducerKeys.concat(["$updateProxyModel"])),
        $schemaForm: state.getIn(reducerKeys.concat([formOptions.schemaKey]))
    };
};

export const hoc = compose<SourceCreateProps, any>(
    connect(mapStateToProps),
    withHandlers({
        validateForm: (propx: SourceCreateProps) => {
            return async (data: any) => {
                let metaData = SchemaFormCreate.metas[formOptions.schemaKey];

                let metaNewData = await metaData.validateAll(data);

                schemaFormModel.actions.updateMetaState({ isLoading: true, isValid: false });
                schemaFormModel.actions.updateMetaState({
                    isLoading: false,
                    meta: metaNewData
                });


                if (!metaData.data.isValid) {
                    toastr.error("验证", metaData.data.errMessage || "验证出错！");
                }

                return metaData;
            };
        }
    }),
    withHandlers({
        createHandle: (props: SourceCreateProps) => {
            return async () => {
                let data = props.$schemaForm.get("data").toJS();
                let metaData = await props.validateForm(data);

                if (metaData.data.isValid) {
                    let serverModelAction: any = await updateProxyModel.actions.execute({
                        data: Object.assign({}, data, {
                            dsOption: JSON.stringify(data.dsOption)
                        }),
                        settings: {
                            type: "formdata"
                        }
                    }, Object.assign({}, proxySettings.create));

                    if (!serverModelAction.error) {
                        schemaFormModel.actions.updateItem({
                            keys: ["id"],
                            data: serverModelAction.payload.id
                        });

                        toastr.success("保存", "保存成功！");
                    }
                }
            };
        },
        updateHandle: (props: SourceCreateProps) => {
            return async () => {
                let data = props.$schemaForm.get("data").toJS();
                let metaData = await props.validateForm(data);

                if (metaData.data.isValid) {
                    let action: any = await updateProxyModel.actions.execute({
                        data: {
                            id: data.id,
                            updatedParams: JSON.stringify(Object.assign({}, data, {
                                dsOption: JSON.stringify(data.dsOption)
                            }))
                        },
                        settings: {
                            type: "formdata"
                        }
                    }, Object.assign({}, proxySettings.update));

                    if (!action.error) {
                        toastr.success("保存", "保存成功！");
                    }
                }
            };
        }
    }),
    withHandlers({
        saveHandle: (props: SourceCreateProps) => {
            return async () => {
                let id = props.$schemaForm.get("data").get("id");

                if (id) {
                    await props.updateHandle();
                } else {
                    await props.createHandle();
                }
            };
        }
    })
);

export const designHoc = compose<SourceCreateProps, any>(hoc,
    lifecycle<SourceCreateProps, any>({
        componentWillUnmount: function () {
            schemaFormModel.actions.updateData({});
        },
        componentWillMount: async function () {
            const { match } = this.props;
            const { id = 0 } = match.params || {};

            if (!id) {
                return;
            }

            let action: Action<any> = await updateProxyModel.actions.execute({
                params: {
                    id: id
                },
                settings: {
                    type: "formdata"
                }
            }, Object.assign({}, proxySettings.detail));

            if (action.payload.id) {
                let { dsOption } = action.payload;

                await schemaFormModel.actions.updateData(Object.assign({}, action.payload, {
                    id: Number(id.toString()),
                    infographicId: action.payload.infographicId || 0,
                    dsOption: JSON.parse(dsOption)
                }) as any);
            }
        }
    }));
