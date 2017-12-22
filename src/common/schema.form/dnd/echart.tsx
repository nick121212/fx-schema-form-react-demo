import React from "react";
import { hocFactory } from "fx-schema-form-react";

const config = {
    icon: "Chart",
    label: "ECHART",

    uiSchema: {
        field: "design",
        widget: "echart",
        "ui:temp": []
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "chart",
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
        notMerge: true,
        lazyUpdate: true,
        theme: "",
        className: "",
        jsonata: `
            $.{
                "title":{
                    "text":$$.data.ceshi2[0].BRAND_NAME
                },
                "graphic":{
                    "style":{
                        "image":"http://www.ukulelefan.com/wp-content/uploads/2017/09/jyy.jpg"
                    }
                }
            }
        `,
        option: {
            "title": {
                "text": "标题",
                "x": "50%"
            },
            "graphic": {
                "type": "image",
                "left": 0,
                "right": 0,
                "style": {
                    "image": "",
                    "width": "400"
                }
            }
        }
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                className: { type: "string" },
                notMerge: {
                    type: "boolean"
                },
                lazyUpdate: {
                    type: "boolean"
                },
                theme: { type: "string" },
                option: {
                    type: "object"
                },
                jsonata: {
                    type: "string"
                }
            }
        },
        uiSchema: (parentKeys: string[]) => [
            parentKeys.concat(["data", "className"]).join("/"),
            parentKeys.concat(["data", "theme"]).join("/"),
            {
                key: parentKeys.concat(["data", "option"]).join("/"),
                field: "string",
                widget: "code",
                "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                    paths: [{ path: "/dsModelData" }, { path: "./jsonata", jsonata: "[$$]" }],
                    hoc: hocFactory.get("jsonata")({ dataPath: "/dsModelData", expPath: "./jsonata" })
                })]
            },
            {
                key: parentKeys.concat(["data", "jsonata"]).join("/"),
                widget: "code"
            }]
    }
};

export default config;
