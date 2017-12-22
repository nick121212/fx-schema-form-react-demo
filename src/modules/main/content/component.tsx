import React from "react";
import Immutable from "immutable";
import { Icon } from "office-ui-fabric-react/lib/Icon";

import { BaseComponent } from "../../../common/component/base";
import { LayoutProps, $InitialState } from "./constant";

export class Component extends BaseComponent<LayoutProps, any> {
    public render() {
        const { children, history } = this.props;

        return (
            <div className="ms-Grid-row pa2">
                {
                    $InitialState.map((d: Immutable.Map<string, any>) => {
                        return <div key={d.get("link")} className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 ">
                            <article className="center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                                <a className="db pv4 ph3 ph0-l no-underline black dim" href="javascript:;" onClick={
                                    () => {
                                        history.push(d.get("link"));
                                    }
                                }>
                                    <div className="flex flex-column flex-row-ns">
                                        <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns tc">
                                            <Icon iconName={d.get("icon")} className="f-headline black" />
                                        </div>
                                        <div className="w-100 w-60-ns pl3-ns">
                                            <div className="tc">
                                                <h1 className="f3 mb2 black">{d.get("title")}</h1>
                                                <h2 className="f5 fw4 gray mt0">{d.get("description")}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </article>
                        </div>;
                    })
                }
            </div>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<LayoutProps> = (Component);
