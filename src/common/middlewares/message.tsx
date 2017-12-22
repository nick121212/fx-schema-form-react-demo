import React from "react";
import { Dispatch, Action, MiddlewareAPI } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import { toastr } from "react-redux-toastr";

export interface MessageAction extends Action, FluxStandardAction<any, any> {
    type: string;
}

export default () => {
    return ({ dispatch }: MiddlewareAPI<any>) => {
        return (next: Dispatch<any>) => {
            return async <A extends Action>(action: A & MessageAction) => {
                if (action.error && !action.payload.msg) {
                    toastr.error(action.type, action.payload.message);
                }

                return next(action);
            };
        };
    };
};
