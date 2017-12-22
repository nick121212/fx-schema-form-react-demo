import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import classnames from "classnames";

import { BaseComponent } from "../../../common/component";
import { ComponentWithHoc as HeaderComponent } from "./header";
import { ComponentWithHoc as DegisnComponent } from "./design";
import { ComponentWithHoc as WidgetComponent } from "./widget";
import { ComponentWithHoc as FormComponent } from "./form";
import { SourceCreateProps } from "./constant";

// import { StatefulSourceBox } from "./source";


@(DragDropContext(HTML5Backend) as any)
class ComponentWithDrog extends React.PureComponent<SourceCreateProps, any> {
    public render() {
        let { match, location, history } = this.props;

        return <div className="ms-Grid-row h-100 pa0 ma0 ba overflow-hidden b--dashed">
            <div className={classnames("ms-Grid-col ms-sm12",
                "ms-md1 ms-hiddenSm h-100 bl br bt-0 bb-0 b--dashed overflow-auto pa0 ma0 h-100")}>
                <WidgetComponent history={history} match={match} location={location} />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md8 overflow-auto pa0 ma0 h-100">
                <DegisnComponent history={history} match={match} location={location} />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md3 overflow-auto pa0 ma0 h-100">
                <FormComponent history={history} match={match} location={location} />
            </div>
        </div>;
    }
}

export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                key={"panel-design"}
                className="h-100"
                onRenderNavigation={() => {
                    return <HeaderComponent history={history} match={match} location={location} />;
                }}
                onRenderBody={() => {
                    return <ComponentWithDrog history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
            </Panel>
        );
    }
}
