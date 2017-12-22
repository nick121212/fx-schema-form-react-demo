import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { DragSource } from "react-dnd";

import components from "../../../common/schema.form/dnd";
import { BaseComponent } from "../../../common/component/index";
import { DndBaseComponentProps } from "../../../common/schema.form/dnd/base";

const source = (config: any) => {
    return (ComponentC: any) => {
        const handleStyle = {
            cursor: "move",
        };
        class Hoc extends React.Component<DndBaseComponentProps<any>, any> {
            public render(): any {
                let { connectDragSource, connectDragPreview, isDragging } = this.props;
                let DndSourceComponent = connectDragSource(
                    <div className={"w-100 h-100" + (isDragging ? "" : "")} style={handleStyle}>
                        <ComponentC {...this.props} {...config} />
                    </div>
                );

                return DndSourceComponent;
            }
        }

        return (DragSource(config.dnd.source.type, config.dnd.source.config, (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
        })) as any)(Hoc);
    };
};

class ItemComponent extends BaseComponent<any, any> {
    public render() {
        let { icon, label, connectDragPreview } = this.props;

        return (
            <div className="flex flex-column relative items-center tc pa2 ma1">
                <input className="absolute h-100 w-100" style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none"
                }} type="text" readOnly />
                {connectDragPreview(<span><Icon iconName={icon} className="flex-auto ml1 f2 black" /></span>)}
                <div className="pl1 tl">
                    <span className="f6 db black-70">{label}</span>
                </div>
            </div>
        );
    }
}

export class Component extends BaseComponent<any, any> {
    public render() {
        return (
            <div className="w-100">
                {
                    components.map((c: any, idx: number) => {
                        let ComponentDndWithHoc: any = source(c)(ItemComponent);

                        return <ComponentDndWithHoc key={"widget" + idx.toString()} />;
                    })
                }
            </div>
        );
    }
}

export const ComponentWithHoc = (Component);
