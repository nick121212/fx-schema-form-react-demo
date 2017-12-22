import React from "react";
import { Dispatch, Action, MiddlewareAPI } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import { toastr } from "react-redux-toastr";

export default () => {
    return ({ dispatch }: MiddlewareAPI<any>) => {
        return (next: Dispatch<any>) => {
            return  <A extends Action>(action: A) => {
                 return next(action);
            };
        };
    };
};
