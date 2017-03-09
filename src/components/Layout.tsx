/// <reference path="../typings.d.ts" />
// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as Helmet from "react-helmet";
import { Layout as AntdLayout, Menu, Icon } from "antd";
const { Header, Sider, Content } = AntdLayout;

interface IState {
    collapsed: boolean;
}

interface IProps { }

class Layout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            collapsed: false
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(): JSX.Element {
        return (
            <div>
                <Helmet
                    htmlAttributes={{ lang: "en" }}
                    title="React, Redux, TypeScript, Ant Design Starter Kit"
                    link={[
                        { rel: "stylesheet", href: "styles.css" }
                    ]}
                />
                <AntdLayout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <AntdLayout>
                        <Header className="header">
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content className="content">
                            {this.props.children}
                        </Content>
                    </AntdLayout>
                </AntdLayout>
            </div>);
    }
};

export default Layout;
