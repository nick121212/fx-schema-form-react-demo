import React from "react";
import { SchemaForm, hocFactory, defaultTheme } from "fx-schema-form-react";
import Ajv, { Thenable, ValidateFunction, SchemaValidateFunction } from "ajv";
import proxy from "../../libs/proxy";

import templates from "./templates";
import widgets from "./widgets";
import schemas from "./schemas";
import fields from "./fields";
import hocs from "./hocs";
import { ItemButtons, ItemChildButtons } from "./item";
import { map } from "./dnd";

// 加载widgets
for (let key in widgets) {
    if (widgets.hasOwnProperty(key)) {
        defaultTheme.widgetFactory.add(key, widgets[key]);
    }
}
// 加载template
for (let key in templates) {
    if (templates.hasOwnProperty(key)) {
        defaultTheme.tempFactory.add(key, templates[key]);
    }
}
// 加载fields
defaultTheme.fieldFactory.unLock("array");
for (let key in fields) {
    if (fields.hasOwnProperty(key)) {
        defaultTheme.fieldFactory.unLock(key);
        defaultTheme.fieldFactory.add(key, fields[key], true);
    }
}
// 加载hocs
for (let key in hocs) {
    if (hocs.hasOwnProperty(key)) {
        hocFactory.add(key, hocs[key]);
    }
}
// 实例化ajv
const curAjv = new Ajv({
    allErrors: true,
    jsonPointers: true,
    useDefaults: true,
    $data: true,
    errorDataPath: "property",
    removeAdditional: true
});
// schemaform的默认参数配置
const schemaFormOptions = {
    ajv: curAjv
};
// uiSchema的全局配置
const globalOptions = {
    "boolean": {
        "widget": "switch"
    },
    "hoc": {
        "array": {
            "ItemChildButtons": ItemChildButtons,
            "ItemButtons": ItemButtons
        },
        "proxy": {
            "proxy": proxy
        }
    },
    widget: {
        code: {
            options: {
                foldGutter: true,
                styleActiveLine: true,
                lineNumbers: true,
                lineWrapping: true,
                // keyMap: "vim",
                tabSize: 2,
                fullScreen: false,
                matchBrackets: true,
                extraKeys: { "Ctrl-Space": "autocomplete" },
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
            }
        }
    },
    "field": {
        "string": {
            "ui:temp": ["formItem"]
        },
        "boolean": {
            "ui:temp": ["formItem"]
        },
        "number": {
            "ui:temp": ["formItem"]
        },
        "object": {
            "ui:temp": ["card"],
            "root": ({ children }) => children
        },
        "array": {
            "ui:temp": ["card"],
            "root": ({ children }) => children
        },
        "design": {
            "root": ({ children }) => children
        }
    }
};
// 加载schema
for (let key in schemas) {
    if (schemas.hasOwnProperty(key)) {
        curAjv.addSchema(schemas[key]);
    }
}

export {
    curAjv as ajv,
    schemaFormOptions,
    globalOptions
};
