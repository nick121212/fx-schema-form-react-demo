import { ModelProxy, BaseEngine } from "modelproxy";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import { IInterfaceModel } from "modelproxy/out/models/interface";
import fetchJsonp from "fetch-jsonp";

export class FetchJsonpEngine extends BaseEngine {
    /**
     * 初始化中间件
     * 处理参数params，data，header等数据
     */
    public init(): void {
        this.use(async (ctx: IProxyCtx, next: Function) => {
            let { executeInfo = {}, instance = {} } = ctx;
            let { timeout = 5000, headers: originHeaders = {}, type = "", fetch = {} } = executeInfo.settings || {};

            ctx.result = await fetchJsonp(this.getFullPath(instance as any, executeInfo), {
                timeout: 3000,
            });

            await next();
        });
    }

    /**
     * 调用接口代理方法
     * @param instance 接口的信息
     * @param options  调用接口的参数
     */
    public async proxy(instance: IInterfaceModel, options: any): Promise<any> {
        const fn = this.callback(() => {
            // console.log();
        });
        const ctx: IProxyCtx = {
            executeInfo: options,
            instance: instance,
        };

        await fn(ctx);

        if (ctx.isError) {
            throw ctx.err;
        }

        return ctx.result;
    }
}
