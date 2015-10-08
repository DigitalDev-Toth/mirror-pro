var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var config = {
    entry: [
        "bootstrap-webpack!./bootstrap.config.js",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "app", "assets"),   
        publicPath: "/assets",
        filename: "js/mirror-pro.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,              
                loader: "babel-loader",
                exclude: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "bootstrap.config.js"),
                    path.resolve(__dirname, "dev"),
                    path.resolve(__dirname, "images"), 
                    path.resolve(__dirname, "node_modules"), 
                    path.resolve(__dirname, "style"),
                    path.resolve(__dirname, "template"),
                    path.resolve(__dirname, "test")
                ] 
            },
            { 
                test: /\.less$/, 
                loader: ExtractTextPlugin.extract("less-loader"),
                exclude: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "dev"),
                    path.resolve(__dirname, "images"), 
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "template"),
                    path.resolve(__dirname, "test")
                ]
            },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                exclude: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "dev"),
                    path.resolve(__dirname, "images"), 
                    path.resolve(__dirname, "node_modules"),                    
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "template"),
                    path.resolve(__dirname, "test")
                ]
            },
            {
                test: /\.(png|jpg)$/, 
                loader: "url-loader?limit=8192&name=/images/[hash].[ext]"
            },
            { 
                test: /bootstrap\/js\//, 
                loader: 'imports?jQuery=jquery' 
            },
            { 
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   
                loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]" 
            },
            { 
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   
                loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]" 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "url?limit=10000&mimetype=application/octet-stream&name=/fonts/[hash].[ext]" 
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "file?name=/fonts/[hash].[ext]" 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "url?limit=10000&mimetype=image/svg+xml&name=/fonts/[hash].[ext]" 
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            title: "Mirror Pro",
            template: "templates/app.html",
            filename: "../index.html",
            inject: true
        }),
        new ExtractTextPlugin("css/[hash].css")
    ],
    devtool: "source-map"
};

module.exports = config;