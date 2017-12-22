import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { List } from "office-ui-fabric-react/lib/List";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { SchemaForm } from "fx-schema-form-react";

import { BaseComponent } from "../../../common/component";
import { SourceCreateProps, formOptions, reducerKeys } from "./constant";
import { designHoc as hoc } from "./container";
import { schemaFormOptions } from "../../../common/schema.form/index";

export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { } = this.props;
        // const { loading, loaded, data } = $listProxyModel.toJS();


        return (
            <FocusZone direction={FocusZoneDirection.vertical}>
                <SchemaForm schemaKey={formOptions.schemaKey}
                    schemaFormOptions={formOptions.schemaFormOptions}
                    schema={formOptions.schema}
                    key={formOptions.schemaKey}
                    reducerKeys={reducerKeys.concat([formOptions.schemaKey])}
                    RootComponent={({ children }) => children}
                    uiSchema={formOptions.uiSchema}
                    globalOptions={formOptions.globalOptions}>

                </SchemaForm>
            </FocusZone>
        );
    }
}

export const ComponentWithHoc = hoc(Component);
