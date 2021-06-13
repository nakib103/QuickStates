const { PRIORITY_LOW } = require("constants")
const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: "/src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                } 
            },
            {
                test: /\.(css)$/,
                use: ["css-loader", "style-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()] 
}