/// <reference path="../typings.d.ts" />
// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { ReduxState } from "../reducer";
import { fetchMessage } from "../modules/message";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const mapStateToProps: (state: ReduxState, ownProps: MainProps) => MainProps =
    (state: ReduxState, ownProps: MainProps): MainProps => ({
        message: state.message.message,
        hasRendered: state.rendering.hasRendered
    });

const mapDispatchToProps: (dispatch: Dispatch<ReduxState>, ownProps: MainProps) => MainProps =
    (dispatch: Dispatch<ReduxState>, ownProps: MainProps): MainProps => ({
        fetchMessage: () => fetchMessage(dispatch)
    });

interface MainProps {
    fetchMessage?: () => void;
    message?: string;
    hasRendered?: boolean;
}

class MainComponent extends React.Component<MainProps, {}> {
    constructor(props: MainProps) {
        super(props);
    }
    static fetchData(dispatch: Dispatch<ReduxState>): Promise<void> {
        // This is the fetchData action creator
        return fetchMessage(dispatch);
    }
    componentWillMount(): void {
        // this prevents the data to be fetched on page load by the client (if it has been already fetched by the server)
        const { hasRendered, fetchMessage }: MainProps = this.props;
        if (!hasRendered) {
            // This is the fetchData method from the props
            fetchMessage();
        }
    }
    render(): JSX.Element {
        return <div>
            <h3>{this.props.message}</h3>
        </div>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);