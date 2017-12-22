import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import { BaseComponent } from "../../component";

export class Component extends BaseComponent<any, any> {
    public render() {
        const { children } = this.props;

        return (
            <Panel isOpen={true} type={PanelType.smallFluid}>

            </Panel>
        );
    }
}
