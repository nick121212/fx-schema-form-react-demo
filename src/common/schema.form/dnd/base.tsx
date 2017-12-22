import React from "react";
import {
    DragSourceSpec, DragSourceMonitor,
    DragSourceConnector, DragSourceOptions, DragPreviewOptions, DragElementWrapper
} from "react-dnd";

import { BaseComponent } from "../../component";

export interface DndBaseComponentProps<P> {
    connectDragSource?: DragElementWrapper<DragSourceOptions>;
    connectDragPreview?: DragElementWrapper<DragPreviewOptions>;
    monitor: DragSourceMonitor;
    connect: DragSourceConnector;
    isDragging: boolean;
}

export class DndBaseComponent<P extends DndBaseComponentProps<P>, S> extends BaseComponent<P, S> {

}
