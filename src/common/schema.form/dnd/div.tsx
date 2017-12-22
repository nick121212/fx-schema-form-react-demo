import React from "react";

const config = {
    icon: "Checkbox",
    label: "DIV",

    uiSchema: {
        field: "design",
        // widget: "",
        "ui:temp": ["div"]
    },
    dnd: {
        target: {
            type: ["div", "row", "image"],
            config: {

            }
        },
        source: {
            type: "div",
            config: {
                beginDrag(props: any) {
                    return {};
                },
                endDrag(props, monitor) {
                    const item = monitor.getItem();
                    const dropResult = monitor.getDropResult();

                    if (dropResult && dropResult.cb) {
                        dropResult.cb(config);
                    }
                }
            }
        }
    },

    design: {
        className: "ba b--dashed b--gray",
    },

    data: {
        className: "w-100 overflow-auto h-100",
        style: {
            minHeight: "100%"
        }
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                className: {
                    type: "string"
                },
                style: {
                    type: "object",
                    properties: {
                        width: { type: "string" },
                        height: { type: "string" }
                    }
                }
            }
        },
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "className"]).join("/")
        },
        {
            key: parentKeys.concat(["data", "style"]).join("/"),
            widget: "code",
            field: "string"
        }]
    }
};

export default config;
