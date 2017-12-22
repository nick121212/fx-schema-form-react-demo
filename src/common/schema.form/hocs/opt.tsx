
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IconButton, IButtonProps } from "office-ui-fabric-react/lib/Button";

import {
    SchemaFormItemBaseProps, RC,
    ThemeHocOutProps, UtilsHocOutProps, ArrayHocOutProps,
    SchemaFormCreate
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { ExtraFieldHocOutProps } from "./field";
import { SchemaForm } from "fx-schema-form-react/libs/components/form";
import { globalOptions } from "../index";

export interface OptHocOutProps extends SchemaFormItemBaseProps, ExtraFieldHocOutProps,
    ThemeHocOutProps, ArrayHocOutProps, UtilsHocOutProps {
    actions?: any;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<OptHocOutProps, any> => {
        @connect(mapMetaStateToProps)
        @(shouldUpdate((prev: OptHocOutProps, next: OptHocOutProps) => {
            let { meta } = prev;
            let { meta: meta1 } = next;
            let { isShow = false } = meta || {};
            let { isShow: isShow1 = false } = meta1 || {};

            return isShow !== isShow1;
        }) as any)
        class ComponentHoc extends React.PureComponent<OptHocOutProps, any> {
            private _menuButtonElement: any | null;

            private getParentOpts() {
                let { mergeSchema, getFieldOptions, getHocOptions, actions, schemaKey, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let menus: any = [];

                keys = keys.concat([]);
                for (let i = arrayLevel.length; i > 1; i--) {
                    let metaInfo = SchemaFormCreate.metas[schemaKey];

                    keys.length = keys.length - 2;

                    let originKeys = keys.concat([]);
                    let { designInfo = {} } = metaInfo.getMeta(keys) as any || {};

                    menus = menus.concat([{
                        key: "edit" + designInfo.label,
                        onClick: () => {
                            actions.toggleItem({ keys: originKeys });
                        },
                        name: "编辑" + designInfo.label,
                        icon: "Edit",
                        className: "ms-CommandBarItem"
                    }]);
                }


                return menus;
            }

            public componentDidMount() {
                let { actions, mergeSchema } = this.props;
                let options = this.props.getFormItemData();

                actions.updateItemMeta({
                    keys: mergeSchema.keys,
                    meta: {
                        designInfo: {
                            icon: options.icon,
                            label: options.label
                        }
                    }
                });
            }

            public render(): any {
                let { mergeSchema, getFieldOptions, getHocOptions, children, schemaFormOptions, schemaKey,
                    reducerKeys,
                    formItemData, actions, arrayIndex, toggleItem, meta = {}, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let options = this.props.getFormItemData();
                let { isShow = false } = meta || {};

                if (!options.label) {
                    return <Component key={keys.join("-") + "2"} {...this.props} />;
                }

                return [
                    <div key={keys.join("-") + "3"} className="absolute" style={{
                        left: 0,
                        top: 0,
                        zIndex: 999
                    }}>
                        <div ref={(menuButton) => this._menuButtonElement = menuButton}>
                            <IconButton
                                iconProps={{ iconName: "MoreVertical" }}
                                onClick={() => {
                                    actions.toggleItem({
                                        keys
                                    });
                                }}
                            />
                        </div>
                        {isShow ? <Callout
                            className="mw9 mw-100-ns mh9"
                            gapSpace={0}
                            beakWidth={10}
                            key={keys.join("-") + "1"}
                            onDismiss={() => {
                                actions.toggleItem({
                                    keys
                                });
                            }}
                            target={this._menuButtonElement}
                            setInitialFocus={true}>
                            <article className="center">
                                <h1 className="pa0 ma0">
                                    <CommandBar
                                        isSearchBoxVisible={false}
                                        items={[{
                                            key: "title",
                                            name: `${options.label} - ${arrayLevel.length} - ${arrayIndex + 1}`,
                                            icon: options.icon
                                        }]}
                                        overflowItems={this.getParentOpts()}
                                        farItems={[{
                                            key: "remove",
                                            disabled: arrayLevel.length < 2,
                                            onClick: () => {
                                                let pKeys = keys.concat([]);

                                                pKeys.pop();
                                                actions.removeItem({ keys: pKeys, index: arrayIndex });
                                            },
                                            name: "删除",
                                            icon: "Remove",
                                            className: "ms-CommandBarItem"
                                        }]}
                                    />
                                </h1>
                                <div className="pa3 bt">
                                    <SchemaForm
                                        arrayIndex={arrayIndex}
                                        schemaFormOptions={schemaFormOptions}
                                        schemaKey={schemaKey}
                                        arrayLevel={arrayLevel}
                                        reducerKeys={reducerKeys}
                                        schema={options.edit.schema}
                                        parentKeys={mergeSchema.originKeys.concat(["data"])}
                                        uiSchema={options.edit.uiSchema(mergeSchema.originKeys) || ["*"]}
                                        globalOptions={globalOptions}>
                                    </SchemaForm>
                                </div>
                            </article>
                        </Callout> : null}
                    </div>,
                    <Component key={keys.join("-") + "2"} {...this.props} />];
            }
        }

        return ComponentHoc as any;
    };
};
