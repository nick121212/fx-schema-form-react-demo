import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";

import {
    confirmModel,
    ConfirmWidgetProps
} from "./constant";

export const hoc = (reducerKeys: string[]) => {
    return compose<ConfirmWidgetProps, any>(
        connect((state: Immutable.Map<string, any>, ownProps: any) => {
            return {
                $confirm: state.getIn(reducerKeys)
            };
        }),
        withHandlers({
            toggleConfirm: (props: ConfirmWidgetProps) => {
                return (confirm: boolean, item?: any) => {
                    confirmModel.actions.confirm({
                        confirm,
                        item
                    });
                };
            },
            _closeDialog: (props: ConfirmWidgetProps) => {
                return () => {
                    confirmModel.actions.confirm({
                        confirm: false,
                        item: null
                    });
                };
            }
        }),
        withHandlers({
            _confirmDialog: (props: ConfirmWidgetProps) => {
                return async () => {
                    if (props._confirmExecute) {
                        await props._confirmExecute(props.$confirm.get("item"));
                    }
                    await props._closeDialog();
                };
            },
        })
    );
};
