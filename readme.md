
# Chart Design

一个用于所见即所得的配置系统，主要产出可视化图表。如果组件够丰富，实现一个简单交互的界面也是可以的。

## 目录

- [安装部署](#installation)
- [依赖项](#dependencies)
- [数据结构](#model)
- [疑问](#qa)
- [License](#license)

## <span id="installation">安装部署</span>

* 打包命令
>
> npm run prd 生产环境
>
> npm run std 测试环境

* 部署

> 打包后根目录会建立dist目录，nginx指向到dist目录中的index.html文件即可。

### <span id="dependencies">依赖项</span>

- react 16+版本
- redux
- react-router
- immutable
- jsonata
- fx-schema-form-react
- codemirror
- echarts
- tachyons
- office-ui-fabric-react

### <span id="model">数据结构</span>

* 数据源数据结构

``` javascript
{
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
}
```

* 面板数据结构

``` javascript
{
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
}
```

### <span id="qa">疑问</span>

1. 为什么需要react 16+的版本？

   这里主要是为了解决组件之间层级引起的css问题。表单系统使用hoc来扩展功能，所以这里加入了很多dom来实现一些功能，这些多出来的dom会引起css的层级问题。16+版本的react，可以不需要根元素，而直接使用数据来返回dom，从而解决层级问题。

2. 数据结构太过复杂，为什么不拆分模型？
   
   我就是想在一个页面中处理一个结构。记得之前老领导说过的一句话，页面交互上减少用户的一次点击，对于医疗系统来说，医生可能当天就能多看一个病人。
    

## <span id="license">License</span>

Apache 2