import { combineReducers } from "redux";
import { RenderingState, default as rendering } from "./modules/rendering";

export interface ReduxState {
    rendering?: RenderingState;
}

export default combineReducers<ReduxState>({
    rendering
});
