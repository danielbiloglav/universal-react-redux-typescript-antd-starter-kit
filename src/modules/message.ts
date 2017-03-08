import { Dispatch, Action } from "redux";

// default state
export interface MessageState {
    message?: string;
}
const defaultState: MessageState = {
};

// types
type GetMessageAction = { message: string } & Action;

// actions
const GET_MESSAGE: string = "message/GET_MESSAGE";

// action creators
export function fetchMessage(dispatch: Dispatch<MessageState>): Promise<void> {
    return Promise.resolve().then(()=>{
        dispatch<GetMessageAction>({
            type: GET_MESSAGE,
            message: "Hello"
        });
    });
}

// reducer
const reducer: (state: MessageState, action: Action) => MessageState =
    (state: MessageState = defaultState, action: Action): MessageState => {
        switch (action.type) {
            case GET_MESSAGE:
                return {
                    ...state,
                    message: (action as GetMessageAction).message
                };
                default:
                return state;
        }
    };

export default reducer;