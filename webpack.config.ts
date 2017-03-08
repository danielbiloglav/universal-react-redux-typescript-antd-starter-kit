import { resolve } from "path";
import { Configuration, optimize, HotModuleReplacementPlugin, NamedModulesPlugin, Entry, DefinePlugin, Plugin, LoaderOptionsPlugin } from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

export default (env: string): Configuration => {
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
            extensions: [".tsx", ".ts", ".js", ".less"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "awesome-typescript-loader"],
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract(["css-loader", "less-loader", "postcss-loader"]),
                },
                {
                    test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader'
                }
            ]
        },
        plugins
    };
};
