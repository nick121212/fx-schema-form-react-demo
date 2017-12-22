import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

import { FetchJsonpEngine } from "./modelproxy-fetch-jsonp";
import designConfig from "../common/modelproxy/design";

/**
 * 接口的配置以及初始化
 * 这里有fetch和jsonp的接口转发器
 */


let proxy = new ModelProxy();
let fetchEngine = new FetchEngine();
let fetchJsonpEngine = new FetchJsonpEngine();

/**
 * fetch接口引擎初始化
 */
fetchEngine.init();
// 如果有http错误，则抛出错误
fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (!ctx.result.ok || ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }

    ctx.result = await ctx.result.json();

    await next();
});
// 如果有服务器端约定错误，测抛出错误
fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (ctx.result.code !== undefined && ctx.result.code !== 200) {
        throw new Error(ctx.result.message);
    }

    ctx.result = ctx.result.data;

    await next();
});

/**
 * jsonp接口引擎
 */
fetchJsonpEngine.init();
fetchJsonpEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (!ctx.result.ok) {
        throw new Error(ctx.result);
    }

    ctx.result = await ctx.result.json();

    await next();
});

fetchJsonpEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (ctx.result.code !== undefined && ctx.result.code !== 200) {

        if (ctx.result.code === 432) {
            location.href = ctx.result.data;
        }

        throw new Error(ctx.result.message);
    }

    ctx.result = ctx.result.data;

    await next();
});

let state = "dev";

if (__PROD__) {
    state = "prd";
}

if (__STAG__) {
    state = "stg";
}

// 加载接口配置
// proxy.loadConfig(webapiConfig, { engine: "fetch" });
proxy.loadConfig(designConfig, { engine: "fetch", state });

// 加载引擎
proxy.addEngines({
    "fetch": fetchEngine,
    "jsonp": fetchJsonpEngine
});

export default proxy;
