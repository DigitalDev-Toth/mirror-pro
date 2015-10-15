var webpack = require("webpack");
var path = require("path");

var config = {
    entry: [
        "webpack/hot/dev-server",
        "bootstrap-webpack!./bootstrap.config.js",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dev", "assets", "js"),   
        publicPath: "/assets/js/",
        filename: "mirror-pro.js"
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
                    path.resolve(__dirname, "templates"),
                    path.resolve(__dirname, "test")
                ] 
            },
            { 
                test: /\.less$/, 
                loader: "less-loader",
                exclude: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "dev"),
                    path.resolve(__dirname, "images"), 
                    path.resolve(__dirname, "node_modules"), 
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "templates"),
                    path.resolve(__dirname, "test")
                ]
            },
            { 
                test: /\.css$/, 
                loader: "style-loader!css-loader",
                exclude: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "dev"),
                    path.resolve(__dirname, "images"), 
                    path.resolve(__dirname, "node_modules"), 
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "templates"),
                    path.resolve(__dirname, "test")
                ]
            },
            {
                test: /\.(png|jpg)$/, 
                loader: "url-loader?limit=8192"
            },
            { 
                test: /bootstrap\/js\//, 
                loader: 'imports?jQuery=jquery' 
            },
            { 
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   
                loader: "url?limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   
                loader: "url?limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "url?limit=10000&mimetype=application/octet-stream" 
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "file" 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    
                loader: "url?limit=10000&mimetype=image/svg+xml" 
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: "eval",
    devServer: {
        contentBase: "./dev",
        progress: true,
        colors: true,
        port: 3000,
    }
};

module.exports = config;