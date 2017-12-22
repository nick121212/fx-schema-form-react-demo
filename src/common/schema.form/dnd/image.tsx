import React from "react";
import { hocFactory } from "fx-schema-form-react";

const config = {
    icon: "FileImage",
    label: "IMAGE",

    uiSchema: {
        field: "design",
        widget: "image",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "image",
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
        className: "",
        imageFit: 3,
        jsonata: `
            $.{
                "srcs":["https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1635448550,399855456&fm=27&gp=0.jpg"],
                "title":"大长腿"
            }
        `,
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
                imageFit: {
                    type: "number"
                },
                srcs: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                title: {
                    type: "string"
                },
                jsonata: {
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
            key: parentKeys.concat(["data", "imageFit"]).join("/"),
            widget: "combobox",
            options: {
                widget: {
                    combobox: {
                        options: [{
                            key: 0,
                            text: "center"
                        }, {
                            key: 1,
                            text: "contain"
                        }, {
                            key: 2,
                            text: "cover"
                        }, {
                            key: 3,
                            text: "none"
                        }]
                    }
                }
            }
        },
        {
            key: parentKeys.concat(["data", "srcs"]).join("/")
        },
        {
            key: parentKeys.concat(["data", "title"]).join("/"),
            options: {
                widget: {
                    text: {
                        multiline: true
                    }
                }
            }
        },
        {
            key: parentKeys.concat(["data", "jsonata"]).join("/"),
            field: "string",
            widget: "code"
        },
        {
            key: parentKeys.concat(["data"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData" }, { path: "./data/jsonata", jsonata: "[$$]" }],
                hoc: hocFactory.get("jsonata")({ dataPath: "/dsModelData", expPath: "./data/jsonata" })
            })]
        }]
    }
};

export default config;
