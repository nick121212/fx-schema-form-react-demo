
import React from "react";
import { compose, shouldUpdate, pure } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import isEqual from "lodash.isequal";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from "react-dnd";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";
import { ExtraFieldHocOutProps } from "./field";

export interface DndTargetHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps,
    ExtraFieldHocOutProps {
    connectDropTarget?: (c: any) => any;
    connect?: ConnectDropTarget;
    monitor?: DropTargetMonitor;

    isOver?: boolean;
    isOverCurrent?: boolean;
    canDrop?: boolean;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<DndTargetHocOutProps, any> => {
        class TargetCompnent extends React.PureComponent<DndTargetHocOutProps, any> {
            public render() {
                let { connectDropTarget, isOver, canDrop, isOverCurrent,
                    mergeSchema, arrayLevel, arrayIndex } = this.props;
                let { keys } = mergeSchema;
                let options = this.props.getFormItemData();

                return connectDropTarget(<div
                    style={{
                        minHeight: 100,
                        left: 0,
                        zIndex: 999 + arrayLevel.length + arrayIndex,
                        right: 0,
                        top: 0,
                    }}
                    key={keys.join("-") + "-dnd-target" + isOver + canDrop}
                    className={classNames("dnd-target absolute dn w-100 h-100 o-50",
                        options.targetClassName, options.label,
                        [{
                            "ba b--dashed b--dark-gray bg-light-gray db": canDrop,
                            "bg-washed-green": isOver && canDrop
                        }])}>
                    {canDrop ?
                        <div style={{ zIndex: 9999 }} className="absolute black">{options.label}</div>
                        : null}
                </div >);
            }
        }

        return TargetCompnent as any;
    };
};
