import React from "react";
import { hocFactory } from "fx-schema-form-react";

const config = {
    icon: "BarChartVertical",
    label: "BAR",

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
            color: ["#3398DB"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "直接访问",
                    type: "bar",
                    barWidth: "60%",
                    data: [10, 52, 200, 334, 390, 330, 220]
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
