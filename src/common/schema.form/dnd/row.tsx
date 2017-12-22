import React from "react";

const config = {
    icon: "RowsGroup",
    label: "ROW",

    uiSchema: {
        field: "design",
        // widget: "",
        "ui:temp": ["row"]
    },
    dnd: {
        target: {
            type: ["col"],
            config: {

            }
        },
        source: {
            type: "row",
            config: {
                beginDrag(props: any) {
                    console.log(props);
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
        className: "",
        style: {
            minHeight: 100,
            minWidth: 100
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
