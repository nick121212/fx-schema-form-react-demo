import React from "react";

import { BaseComponent } from "../../../common/component/base";


export class Component extends BaseComponent<any, any> {
    public render() {
        const { children } = this.props;

        return (
            <footer className="pv5 pv6-l ph4 tc">
                <p>
                    这里所有的接口方法已经被移除，所以可能影响一部分的表单没办法演示
                </p>
                <p className="f6">
                    <span className="dib">
                        <a href="https://github.com/nick121212/fx-schema-form/tree/master/packages/fx-schema-form-react">
                            GITHUB
                        </a>
                    </span>
                </p>
            </footer>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<any> = (Component);
