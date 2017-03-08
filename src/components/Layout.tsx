import * as React from "react";
import * as Helmet from "react-helmet";

class Layout extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render(): JSX.Element {
        return <div>
            <Helmet
                htmlAttributes={{ lang: "en" }}
                title="React, Redux, TypeScript, Ant Design Starter Kit"
                link={[
                    { rel: "stylesheet", href: "styles.css" }
                ]}
            />
            {this.props.children}
        </div>;
    }
};

export default Layout;
