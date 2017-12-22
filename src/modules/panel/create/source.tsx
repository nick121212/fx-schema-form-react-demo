import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
// import Colors from "./Colors";

const style = {
    border: "1px dashed gray",
    padding: "0.5rem",
    margin: "0.5rem",
};

const ColorSource = {
    canDrag(props: any) {
        return !props.forbidDrag;
    },

    beginDrag() {
        return {};
    },
};

@(DragSource(props => {
    return props.color;
}, ColorSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
})) as any)
class SourceBox extends Component<any, any> {
    public render() {
        const {
			color,
            children,
            isDragging,
            connectDragSource,
            forbidDrag,
            onToggleForbidDrag,
		} = this.props;
        const opacity = isDragging ? 0.4 : 1;

        let backgroundColor;
        switch (color) {
            case "yellow":
                backgroundColor = "lightgoldenrodyellow";
                break;
            case "blue":
                backgroundColor = "lightblue";
                break;
            default:
                break;
        }

        return connectDragSource(
            <div
                style={{
                    ...style,
                    backgroundColor,
                    opacity,
                    cursor: forbidDrag ? "default" : "move",
                }}
            >
                <input
                    type="checkbox"
                    checked={forbidDrag}
                    onChange={onToggleForbidDrag}
                />
                <small>Forbid drag</small>
                {children}
            </div>,
        );
    }
}

export class StatefulSourceBox extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            forbidDrag: false,
        };
    }

    public render() {
        return (
            <SourceBox
                {...this.props}
                forbidDrag={this.state.forbidDrag}
                onToggleForbidDrag={() => this.handleToggleForbidDrag()}
            />
        );
    }

    public handleToggleForbidDrag() {
        this.setState({
            forbidDrag: !this.state.forbidDrag,
        });
    }
}
