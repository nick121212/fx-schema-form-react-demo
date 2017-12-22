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

import div from "../../../common/schema.form/dnd/div";
import { map } from "../../../common/schema.form/dnd/index";

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
    create: { ns: "design", key: "infographicAdd" },
    update: { ns: "design", key: "infographicUpdate" },
    detail: { ns: "design", key: "infographicDetail" }
};
export const $InitialState = {
    infoOptions: [div],
    dsModelIds: [],
    dsModelData: {
        data: {},
        ids: {}
    }
};
export const updateProxyModel = new ModelProxyReducer();

export const formOptions = {
    schemaKey: "$panelCreateSchemaForm",
    schema: {
        type: "object",
        $id: "design",
        required: ["name", "dsModelIds"],
        properties: {
            name: {
                type: "string",
                title: "面板名称"
            },
            description: {
                type: "string",
                title: "面板详情"
            },
            dsModelIds: {
                type: "array",
                items: {
                    type: "number"
                }
            },
            dsModelData: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        additionalProperties: false,
                    },
                    ids: {
                        type: "object",
                        additionalProperties: false,
                    }
                }
            },
            infoOptions: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        data: {
                            type: "object",
                            properties: {}
                        },
                        infoOptions: {
                            $ref: "design#/properties/infoOptions"
                        }
                    }
                }
            }
        }
    },
    uiSchema: [{
        key: "infoOptions",
        items: [
            { key: "infoOptions/-" }
        ]
    }],
    globalOptions: {
        "hoc": {
            "array": {},
            "extraTemp": {
                "design": true,
            },
            "extraField": {
                "widgets": map
            }
        },
        "field": {
            "string": {
                "ui:temp": [],
            },
            "number": {
                "ui:temp": [],
            },
            "object": {
                "ui:temp": [],
                "root": ({ children }) => children,
                "ui:item.hoc": ["theme", "validate", "array", "extraField", "field", "dnd", "extraTemp", "temp", "opt"]
            },
            "array": {
                "ui:temp": [],
                "root": ({ children }) => children,
                "ui:item.hoc": ["theme", "validate", "array", "extraField", "field", "dnd", "extraTemp", "temp", "opt"]
            },
            "design": {
                "root": ({ children }) => children
            }
        }
    },
    schemaFormOptions
};

export const formOptions1 = Object.assign({}, formOptions, {
    uiSchema: ["name", "description", {
        key: "dsModelIds",
        title: "数据源设置",
        items: [{
            title: "数据源",
            key: "dsModelIds/-",
            "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
            widget: "combobox",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "dsmodelAll",
                        property: "options",
                        jsonata: `
                        $$.content[].{
                            "key": $.id,
                            "text": $.name
                        }
                    `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000,
                                used: false
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
        }]
    }, {
            title: "数据源中的数据",
            keys: ["dsModelData"],
            "ui:temp": ["card"],
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "./dsModelIds" }],
                hoc: hocFactory.get("dsmodel")({
                    path: "./dsModelIds",
                    proxyInfo: { ns: "design", key: "infodataOne" }
                })
            })],
            field: "string",
            widget: "code"
        }],
    globalOptions: globalOptions
});

export const schemaFormModel: FormReducer<any> = createForms.createOne(formOptions.schemaKey, $InitialState, {
    reducerKeys: []
}, "immu", ajv, formOptions.schema);
