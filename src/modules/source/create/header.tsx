import React from "react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { BaseComponent } from "../../../common/component";
import { SourceCreateProps } from "./constant";
import { hoc } from "./container";

export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { $updateProxyModel, history, saveHandle } = this.props;
        const { loading, loaded, error } = $updateProxyModel.toJS();

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "back",
                    name: "",
                    icon: "Back",
                    onClick: () => {
                        history.push("/");
                    }
                }, {
                    key: "title",
                    name: "数据源",
                    icon: "Database"
                }]}
                farItems={[{
                    key: "new" + loading,
                    disabled: loading,
                    onClick: () => {
                        saveHandle();
                    },
                    name: "保存",
                    icon: "Save",
                    className: "ms-CommandBarItem"
                }]}
            />
        );
    }
}

export const ComponentWithHoc = hoc(Component);
