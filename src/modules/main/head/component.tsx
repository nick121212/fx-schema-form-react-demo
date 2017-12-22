import React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";

import { BaseComponent } from "../../../common/component/base";
import { hoc } from "./container";

export class Component extends BaseComponent<any, any> {
    public render() {
        const { children, $user } = this.props;

        return (
            <header className="pv3 flex">
                <h3 className="flex-auto f2 fw7 pl3 ttu tracked lh-title mt0 mb3 avenir">
                    <Icon iconName={"Design"} className="f2" />
                    FX-SCHEMA-FORM-DEMO
                </h3>
                {/* <div className="pr3" style={{
                    width: 120
                }}>
                    <Icon iconName="TemporaryUser" className="pt1 mr1" />
                    {
                        $user ? $user.getIn(["data", "name"]) : ""
                    }
                </div> */}
            </header>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<any> = hoc(Component);
