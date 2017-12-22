import React from "react";
import ReduxToastr from "react-redux-toastr";

import { BaseComponent } from "../../common/component/index";

export class Component extends BaseComponent<any, any> {
    public render() {
        const { children, history, match, location, $messages, removeMessage } = this.props;

        return (
            <div className="fixed" style={{
                bottom: 5,
                right: 0,
                zIndex: 99999999
            }}>
                <ReduxToastr
                    timeOut={3000}
                    preventDuplicates
                    position="bottom-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar />
            </div>
        );
    }
}

export const ComponentWithHoc = Component;
