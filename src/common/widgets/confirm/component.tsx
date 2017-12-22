import React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";

import { BaseComponent } from "../../component";
import { ConfirmWidgetProps } from "./constant";

export class Component extends BaseComponent<ConfirmWidgetProps, any> {
    public render() {
        const { _closeDialog, $confirm, _confirmDialog, dialogOptions } = this.props;

        return (
            <Dialog hidden={!$confirm.get("confirm")}
                onDismiss={_closeDialog.bind(this)}
                dialogContentProps={{
                    type: DialogType.close,
                    title: "All emails together",
                    subText: "Your Inbox has changed. No on for your emails."
                }}
                modalProps={{
                    isBlocking: false,
                    containerClassName: "ms-dialogMainOverride"
                }}
                {...dialogOptions}>
                {null /** You can also include null values as the result of conditionals */}
                <DialogFooter>
                    <PrimaryButton onClick={_confirmDialog.bind(this)} text="确定" />
                    <DefaultButton onClick={_closeDialog.bind(this)} text="取消" />
                </DialogFooter>
            </Dialog>
        );
    }
}
