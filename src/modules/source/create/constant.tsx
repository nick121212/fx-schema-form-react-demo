import React from "react";
import Immutable from "immutable";
import { RouteComponentProps } from "react-router-dom";
import { FormReducer, createForms, SchemaFormItemProps } from "fx-schema-form-react";
import { hocFactory } from "fx-schema-form-react/libs/hocs";

import proxy from "../../../libs/proxy";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { rootReducerKey } from "../constant";
import { PaginationReducer } from "../../../common/reducer/pagination";
import { ConfirmComponent, ConfirmWidgetProps } from "../../../common/widgets/confirm/index";
import { globalOptions, schemaFormOptions, ajv } from "../../../common/schema.form/index";

export const reducerKey = "create";
export const reducerKeys = ["modules", rootReducerKey, reducerKey];
export interface SourceCreatePropsRaw {
    /**
     * 更细数据
     */
    $updateProxyModel?: Immutable.Map<string, any>;
    /**
     * 更新数据
     */
    updateHandle?: () => Promise<any>;
    createHandle?: () => Promise<any>;
    saveHandle?: () => Promise<any>;
    validateForm?: (data: any) => Promise<any>;

    $schemaForm?: Immutable.Map<string, any>;
}
export interface SourceCreateProps extends SourceCreatePropsRaw, RouteComponentProps<any> {

}
export const proxySettings = {
    create: { ns: "design", key: "dsmodelAdd" },
    update: { ns: "design", key: "dsmodelUpdate" },
    detail: { ns: "design", key: "dsmodelDetail" }
};
export const $InitialState = Immutable.fromJS({
});
export const updateProxyModel = new ModelProxyReducer();

export const formOptions = {
    schemaKey: "$createSchemaForm",
    schema: {
        type: "object",
        required: ["name", "type", "dsOption"],
        properties: {
            id: { type: "number", default: 0 },
            name: { type: "string", minLength: 2 },
            type: { type: "string" },
            infographicId: { type: "number" },
            dsOption: {
                type: "object",
                required: ["sourceType"],
                default: {},
                properties: {
                    menuId: { type: "number" },
                    parentMenuId: { type: "number" },
                    p_type: { type: "string" },
                    sourceType: { type: "string" },
                    params: {
                        type: "array",
                        default: [],
                        items: {
                            type: "object",
                            required: ["name", "type", "data"],
                            properties: {
                                name: { type: "string" },
                                type: { type: "string", enum: ["period", "dimension", "fixed"] },
                                data: {
                                    oneOf: [{
                                        default: {},
                                        type: "object",
                                        title: "固定参数-fixed",
                                        required: ["value"],
                                        properties: {
                                            value: { type: "string" }
                                        }
                                    }, {
                                        type: "object",
                                        default: {},
                                        title: "维度参数-dimension",
                                        required: ["dataFieldName", "correspondField"],
                                        properties: {
                                            dataFieldName: { type: "string" },
                                            correspondField: { type: "string" }
                                        }
                                    }, {
                                        type: "object",
                                        default: {},
                                        title: "周期性参数-period",
                                        required: ["correspondValue"],
                                        properties: {
                                            correspondValue: {
                                                default: {},
                                                type: "object",
                                                required: ["dataType", "initialValue", "periodGap"],
                                                properties: {
                                                    dataType: { type: "string" },
                                                    initialValue: { type: "string" },
                                                    periodGap: {
                                                        type: "object",
                                                        required: ["value", "unit"],
                                                        properties: {
                                                            value: { type: "number" },
                                                            unit: { type: "string" }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    uiSchema: [
        "name",
        {
            key: "type",
            "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
            widget: "combobox",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "apptypeAll",
                        property: "options",
                        jsonata: `
                        $$.content[].{
                            "key": $.appName,
                            "text": $.description
                        }
                    `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000
                            }
                        }
                    }
                },
                widget: {
                    combobox: {
                        autoComplete: "on",
                        allowFreeform: true
                    }
                }
            }
        },
        {
            key: "dsOption/sourceType",
            "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
            widget: "combobox",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "sourcetypeAll",
                        property: "options",
                        jsonata: `
                        $$.content[].{
                            "key": $.name,
                            "text": $.cname
                        }
                    `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000
                            }
                        }
                    }
                },
                widget: {
                    combobox: {
                        autoComplete: "on",
                        allowFreeform: true
                    }
                }
            }
        },
        // {
        //     key: "infographicId",
        //     "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
        //     widget: "combobox",
        //     options: {
        //         hoc: {
        //             proxy: {
        //                 ns: "design",
        //                 key: "infographicAll",
        //                 property: "options",
        //                 jsonata: `
        //                 $$.content[].{
        //                     "key": $.id,
        //                     "text": $.name & "-" & $.appType
        //                 }
        //             `,
        //                 options: {
        //                     params: {
        //                         page: 0,
        //                         size: 10000
        //                     }
        //                 }
        //             }
        //         },
        //         widget: {
        //             combobox: {
        //                 autoComplete: "on",
        //                 allowFreeform: true
        //             }
        //         }
        //     }
        // },
        "dsOption/p_type",
        {
            key: "dsOption/menuId",
            "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
            widget: "combobox",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "dataconnAll",
                        property: "options",
                        jsonata: `
                            $$.content[].{
                                "key": $.id,
                                "text": $.connName,
                                "parentMenuId":$.resourceId
                            }
                        `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000
                            }
                        }
                    }
                },
                widget: {
                    combobox: {
                        autoComplete: "on",
                        allowFreeform: true,
                        onChanged: async (props: any, options: any, index: number, value: any) => {
                            if (index !== undefined) {
                                props.actions.updateItem({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./parentMenuId"),
                                    data: options.parentMenuId
                                });

                                props.actions.removeItemMap({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params")
                                });

                                let data: Array<any> = await proxy.execute("sf", "queryFilter", {
                                    params: {
                                        app_key: "sgqphph6YdybP455",
                                        id: options.parentMenuId
                                    }
                                }).then((d: Array<any>) => {
                                    if (d && d.length) {
                                        d.forEach((element, idx) => {
                                            if (element.values) {
                                                props.actions.updateItemMeta({
                                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params")
                                                        .concat([idx, "data", "value"]),
                                                    meta: {
                                                        options: element.values.map((e) => {
                                                            return {
                                                                key: e.code,
                                                                text: e.name
                                                            };
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                    }

                                    return d;
                                });

                                props.actions.updateItem({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params"),
                                    data: data ? data.map(element => {
                                        return {
                                            name: element.parameterCode,
                                            widget: element.display,
                                            title: element.parameterName
                                        };
                                    }) : []
                                });
                            }
                        }
                    }
                }
            }
        }, {
            key: "dsOption/params",
            "ui:item.hoc": ["theme", "field", "validate", "array", hocFactory.get("con")({
                paths: [{ path: "./menuId", jsonata: "$>0" }],
                hoc: hocFactory.get("sh")({ path: "./menuId", jsonata: "$" })
            }), "temp"],
            items: [{
                key: "dsOption/params/-",
                field: "object",
                "ui:temp": ["card"],
                items: [{
                    key: "dsOption/params/-/name",
                    options: {
                        widget: {
                            text: {
                                disabled: true
                            }
                        }
                    }
                }, {
                    key: "dsOption/params/-/type",
                    widget: "choice",
                    options: {
                        widget: {
                            choice: {
                                onChange: (props: any) => {
                                    props.actions.updateItem({
                                        keys: props.getPathKeys(props.mergeSchema.keys, "./data"),
                                        data: {}
                                    });
                                },
                                options: [{
                                    key: "fixed",
                                    iconProps: { iconName: "ReviewResponseSolid" },
                                    text: "固定参数"
                                }, {
                                    key: "period",
                                    iconProps: { iconName: "ReviewRequestMirroredSolid" },
                                    text: "周期性参数"
                                }, {
                                    key: "dimension",
                                    iconProps: { iconName: "ReviewRequestSolid" },
                                    text: "维度参数"
                                }]
                            }
                        }
                    }
                }, {
                    key: "dsOption/params/-/data",
                    "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                        paths: [{ path: "./type", jsonata: "$" }],
                        hoc: hocFactory.get("oneof")({
                            path: "./type",
                            uiSchemas: {
                                "fixed": {
                                    index: 0,
                                    uiSchema: [{
                                        key: "dsOption/params/-/data/value",
                                        widget: "combobox",
                                        "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
                                        options: {
                                            hoc: {
                                                proxy: {
                                                    property: "options",
                                                }
                                            },
                                            widget: {
                                                combobox: {
                                                    autoComplete: "on",
                                                    allowFreeform: true
                                                }
                                            }
                                        }
                                    }]
                                },
                                "dimension": {
                                    index: 1,
                                    uiSchema: ["*"]
                                },
                                "period": {
                                    index: 2,
                                    uiSchema: [{
                                        key: "dsOption/params/-/data/correspondValue/dataType",
                                        widget: "choice",
                                        options: {
                                            widget: {
                                                choice: {
                                                    options: [{
                                                        key: "date",
                                                        iconProps: { iconName: "EventDate" },
                                                        text: "日期"
                                                    }, {
                                                        key: "integer",
                                                        iconProps: { iconName: "NumberField" },
                                                        text: "整数"
                                                    }]
                                                }
                                            }
                                        }
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/initialValue",
                                        widget: "text",
                                        "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                                            paths: [{ path: "./dataType", jsonata: "$" }],
                                            hoc: hocFactory.get("custom")({
                                                path: "./dataType", func: (props, data) => {
                                                    if (data === "date") {
                                                        props.mergeSchema.uiSchema.widget = "date";
                                                    } else if (data === "integer") {
                                                        props.mergeSchema.uiSchema.widget = "text";
                                                    }
                                                }
                                            })
                                        }), "field"]
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/periodGap/value",
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/periodGap/unit",
                                        widget: "choice",
                                        options: {
                                            widget: {
                                                choice: {
                                                    options: [{
                                                        key: "year",
                                                        iconProps: { iconName: "DateTime" },
                                                        text: "年"
                                                    }, {
                                                        key: "month",
                                                        iconProps: { iconName: "DateTimeMirrored" },
                                                        text: "月"
                                                    }, {
                                                        key: "week",
                                                        iconProps: { iconName: "DateTime2" },
                                                        text: "周"
                                                    }]
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        })
                    }), hocFactory.get("con")({
                        paths: [{ path: "./", jsonata: "$" }],
                        hoc: hocFactory.get("custom")({
                            path: "./",
                            func: (props: any, data) => {
                                data = data.toJS();
                                if (data.type === "fixed") {
                                    props.mergeSchema.uiSchema.items[0].widget = data.widget;
                                }
                            }
                        })
                    })],
                    "ui:temp": "card",
                    field: "object",
                    items: [],
                }]
            }]
        }],
    globalOptions,
    schemaFormOptions
};

export const schemaFormModel: FormReducer<any> = createForms.createOne(formOptions.schemaKey, $InitialState, {
    reducerKeys: []
}, "immu", ajv, formOptions.schema);
