import { Reducer } from "redux";
import { ComponentEnhancer } from "recompose";

export abstract class WidgetBase {
    protected _reducer: Reducer<any>;
    protected _container: ComponentEnhancer<any, any>;
    protected _component: any;

    public abstract getReducer(): any;
    public abstract getContainer(hoc?: any): any;
    public abstract getComponent(): any;
}
