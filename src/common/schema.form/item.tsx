import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

/**
 * 数组arrayHoc的组件
 * 有添加和收缩功能
 */
export class ItemButtons extends React.PureComponent<SchemaFormItemProps, any> {
    public render() {
        const { meta, getTitle, getHocOptions, addItem, toggleItem } = this.props;
        const { isShow = true } = meta || {};
        const options = getHocOptions("array");

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "title",
                    name: getTitle().toString(),
                    icon: "Info"
                }]}
                farItems={[{
                    key: "add",
                    name: "",
                    disabled: options.add === true,
                    onClick: () => {
                        addItem();
                    },
                    icon: "Add"
                }, {
                    key: "sh" + isShow,
                    name: "",
                    onClick: toggleItem.bind(this),
                    icon: isShow ? "ChevronUp" : "ChevronDown"
                }]}
            />
        );
    }
}

/**
 * 数组arrayHoc的组件
 * 有删除和上下移位功能
 */
export class ItemChildButtons extends React.PureComponent<SchemaFormItemProps, any> {
    public render() {
        const { arrayIndex, formItemData, getHocOptions, meta, removeItem, switchItem, getTitle } = this.props;
        const { isShow = true } = meta || {};
        const options = getHocOptions("array");

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "title",
                    name: getTitle().toString(),
                    icon: "Info"
                }]}
                farItems={[{
                    key: "remove",
                    name: "",
                    disabled: options.remove === true,
                    onClick: removeItem.bind(this, arrayIndex),
                    icon: "Remove"
                }, {
                    key: "moveUp",
                    name: "",
                    onClick: switchItem.bind(this, arrayIndex, arrayIndex - 1),
                    icon: "ChevronUp"
                }, {
                    key: "moveDown",
                    name: "",
                    onClick: () => {
                        if (arrayIndex + 1 === formItemData.size) {
                            return;
                        }
                        switchItem(arrayIndex, arrayIndex + 1);
                    },
                    icon: "ChevronDown"
                }]}
            />
        );
    }
}
