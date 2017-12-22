import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";

import { reducerKeys, messageReducer } from "./constant";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        $messages: state.getIn(reducerKeys.concat(["messages"])),
    };
};

export const hoc = compose<any, any>(
    connect(mapStateToProps),
    withHandlers({
        removeMessage: () => {
            return (data: any) => {
                messageReducer.actions.remove(data);
            };
        }
    })
);
