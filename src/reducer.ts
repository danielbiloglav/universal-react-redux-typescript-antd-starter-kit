import { combineReducers } from "redux";
import { MessageState, default as message } from "./modules/message";
import { RenderingState, default as rendering } from "./modules/rendering";

export interface ReduxState {
    message?: MessageState;
    rendering?: RenderingState;
}

export default combineReducers<ReduxState>({
    message,
    rendering
});
