import { WidgetBase } from "../base";
import { Component } from "./component";
import { hoc } from "./container";
import { confirmModel, ConfirmWidgetProps } from "./constant";
import { compose, pure } from "recompose";

export class ConfirmComponent extends WidgetBase {
    constructor(private reducerKeys: string[], private options: any = {}) {
        super();
    }

    public getComponent() {
        return Component;
    }
    public getContainer(extraHoc?: any) {
        return compose(extraHoc || pure, hoc(this.reducerKeys));
    }
    public getReducer() {
        return confirmModel.reducer;
    }
    public getActions() {
        return [
            confirmModel.actions.confirm
        ];
    }
    public getSagas() {
        return [];
    }
}
export { ConfirmWidgetProps };
