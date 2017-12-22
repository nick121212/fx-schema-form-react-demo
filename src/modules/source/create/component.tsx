import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import { BaseComponent } from "../../../common/component";
import { ComponentWithHoc as HeaderComponent } from "./header";
import { ComponentWithHoc as FormComponent } from "./form";
import { SourceCreateProps } from "./constant";

export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                onRenderNavigation={() => {
                    return <HeaderComponent history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
                <FormComponent history={history} match={match} location={location} />
            </Panel>
        );
    }
}
