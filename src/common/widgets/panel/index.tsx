import { WidgetBase } from "../base";
import { Component } from "./component";

export class PanelComponent extends WidgetBase {
    
    public getComponent() {
        return Component;
    }
    public getContainer() {
        return null;
    }
    public getReducer() {
        return null;
    }
}
