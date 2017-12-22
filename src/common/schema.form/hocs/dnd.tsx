
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

export interface DndTargetHocOutProps extends SchemaFormItemBaseProps,
    ThemeHocOutProps, UtilsHocOutProps, ExtraFieldHocOutProps {
    connectDropTarget?: (c: any) => any;
    connect?: ConnectDropTarget;
    monitor?: DropTargetMonitor;

    isOver?: boolean;
    isOverCurrent?: boolean;
    canDrop?: boolean;
}

/**
 * dnd包装器
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<DndTargetHocOutProps, any> => {
        const boxTarget = {
            drop(props, monitor, component) {
                const hasDroppedOnChild = monitor.didDrop();

                if (hasDroppedOnChild) {
                    return;
                }

                const { mergeSchema, actions } = props;
                const { keys } = mergeSchema;

                return {
                    cb: (config) => {
                        actions.addItem({
                            keys: keys.concat(["infoOptions"]), data: Object.assign({}, config)
                        });
                    }
                };
            }
        };

        /**
         * 包装一层拖拽层
         */
        class ComponentHoc extends React.PureComponent<DndTargetHocOutProps, any> {
            /**
             * render
             */
            public render(): JSX.Element | JSX.Element[] {
                const { mergeSchema, currentTheme, getFieldOptions, children } = this.props;
                let ComponentWithHoc: any = null;
                let { keys } = mergeSchema;
                let options = this.props.getFormItemData();

                if (options.dnd && options.dnd.target) {
                    ComponentWithHoc = compose(
                        connect(mapFormItemDataProps),
                        DropTarget(options.dnd.target.type,
                            Object.assign({}, options.dnd.target.config || {}, boxTarget), (connect1, monitor) => ({
                                connectDropTarget: connect1.dropTarget(),
                                connect,
                                monitor,
                                isOver: monitor.isOver(),
                                isOverCurrent: monitor.isOver({ shallow: true }),
                                canDrop: monitor.canDrop()
                            })),
                        hocFactory.get("target")()
                    )(null);
                }


                return <Component key={keys.join("dnd") + "dnd"} {...this.props } >
                    {ComponentWithHoc ?
                        <ComponentWithHoc key={keys.join("target") + "target"} {...this.props} /> : null}
                </Component>;
            }
        }

        return ComponentHoc as any;
    };
};

