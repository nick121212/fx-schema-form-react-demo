import React from "react";
import { hocFactory } from "fx-schema-form-react";

const config = {
    icon: "StackedLineChart",
    label: "LINE",

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
        className: "",
        jsonata: `
            $.{
            }
        `,
        option: {
            title: {
                text: "折线图堆叠"
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["搜索引擎"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "邮件营销",
                    type: "line",
                    stack: "总量",
                    data: []
                }
            ]
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
            }, {
                key: parentKeys.concat(["data", "jsonata"]).join("/"),
                widget: "code"
            }]
    }
};

export default config;
