import { resolve } from "path";
import { Configuration, optimize, HotModuleReplacementPlugin, NamedModulesPlugin, Entry, DefinePlugin, Plugin, LoaderOptionsPlugin } from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

require.extensions['.less'] = () => {
    return;
};

export default (env: string): Configuration => {

    let theme = {
        "@icon-url": '"/iconfont"'
    };

    // add hot module replacement if not in production
    let entry: Entry = {
        main: "./src/index.tsx",
        vendor: ["react", "react-dom", "react-router", "redux", "react-helmet", "react-redux", "serialize-javascript"]
    };

    entry = env !== "production" ? {
        hot: ["react-hot-loader/patch", "webpack-hot-middleware/client"],
        ...entry
    } : entry;

    // set devtool according to the environment
    const devtool: "source-map" | "eval-source-map" = env === "production" ? "source-map" : "eval-source-map";

    let plugins: Plugin[] = [new optimize.CommonsChunkPlugin({
        names: ["vendor", "common"]
    }), new ExtractTextPlugin("styles.css")];

    // set plugins hot module replacement plugins if not in production
    plugins = env === "production" ? [...plugins, new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        },
        sourceMap: true
    })] : [...plugins,
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()];

    return {
        entry,
        output: {
            filename: "[name].js",
            path: resolve(__dirname, "dist", "static"),
            publicPath: "/"
        },
        devtool,
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".css", ".less"]
        },
        module: {
            rules: [
                {
                    test: /\.(js|tsx?)$/,
                    use: ["babel-loader", "awesome-typescript-loader"],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                },
                {
                    test: /(\.less)$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: `css-loader!less-loader?{modifyVars:${JSON.stringify(theme)}}`
                    })
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
                }, 
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
                }, 
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]"
                }, 
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&name=iconfont/[name].[ext]"
                }, 
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]"
                }
            ]
        },
        plugins
    };
};
