import React from "react";
import Immutable from "immutable";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { PaginationReducer } from "../../../common/reducer/pagination";
import { ConfirmReducer } from "../../reducer/confirm";

export interface ConfirmWidgetProps {
    _closeDialog?: () => void;
    _confirmDialog?: () => void;
    _confirmExecute?: (item: any) => void;
    toggleConfirm?: (confirm: boolean, item?: any) => void;
    $confirm?: Immutable.Map<string, any>;

    dialogOptions?: any;
}

export const confirmModel = new ConfirmReducer();
