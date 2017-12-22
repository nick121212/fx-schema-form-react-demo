import React from "react";

const config = {
    icon: "TripleColumn",
    label: "COL",

    uiSchema: {
        field: "design",
        // widget: "",
        "ui:temp": ["col"]
    },
    dnd: {
        target: {
            type: ["chart", "image"],
            config: {

            }
        },
        source: {
            type: "col",
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
        className: "ma0 pa0",
        style: {
            minHeight: 100,
            minWidth: 100
        },
        small: {
            span: 4,
            pull: 0,
            push: 0
        },
        large: {
            span: 0,
            pull: 0,
            push: 0
        },
        medium: {
            span: 0,
            pull: 0,
            push: 0
        }, eLarge: {
            span: 0,
            pull: 0,
            push: 0
        }, eeLarge: {
            span: 0,
            pull: 0,
            push: 0
        }, eeeLarge: {
            span: 0,
            pull: 0,
            push: 0
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
                },
                small: {
                    type: "object",
                    description: "小屏320px - 479px)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
                medium: {
                    type: "object",
                    description: "中等屏(480px - 639px)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
                large: {
                    type: "object",
                    description: "大屏(640px - 1023px)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
                eLarge: {
                    type: "object",
                    description: "超大屏(1024px - 1365px)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
                eeLarge: {
                    type: "object",
                    description: "特大屏(1366px - 1919px)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
                eeeLarge: {
                    type: "object",
                    description: "特特大幕(1920px and up)",
                    properties: {
                        span: { type: "number", default: 1 },
                        pull: { type: "number", default: 1 },
                        push: { type: "number", default: 1 }
                    }
                },
            }
        },
        uiSchema: (parentKeys: string[]) => [
            parentKeys.concat(["data", "className"]).join("/"),
            {
                field: "object",
                title: "",
                "ui:temp": ["row"],
                options: {
                    col: {
                        className: "pa0 ma0"
                    }
                },
                items: [
                    {
                        key: parentKeys.concat(["data", "style"]).join("/"),
                        widget: "code",
                        field: "string",
                        "ui:temp": ["col"]
                    }, {
                        field: "object",
                        title: "比例设置",
                        "ui:temp": ["col", "card", "row"],
                        options: {
                            col: {
                                className: "ms-sm8"
                            },
                        },
                        items: [{
                            key: parentKeys.concat(["data", "small"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }, {
                            key: parentKeys.concat(["data", "medium"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }, {
                            key: parentKeys.concat(["data", "large"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }, {
                            key: parentKeys.concat(["data", "eLarge"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }, {
                            key: parentKeys.concat(["data", "eeLarge"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }, {
                            key: parentKeys.concat(["data", "eeeLarge"]).join("/"),
                            "ui:temp": ["col", "card"],
                            options: {
                                col: {
                                    className: "ms-sm12 ms-md4 ms-lg3"
                                }
                            }
                        }]
                    }
                ]
            }
        ]
    }
};

export default config;
