const path = require('path');
const HtmlPlugin = require('html-webpack-plugin'); //помогает работать с html-файлами и добавляет в них ссылку на бандл
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin'); //очищает папку dist от старых файлов
const CopyPlugin = require('copy-webpack-plugin'); //копирует файлы или папки в dist

module.exports = {
    entry: {
        path: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: './public/index.html'
        }),
        new CleanPlugin(),
        new CopyPlugin({
            patterns: [{ from: './static', to: './static' }]
        }),
    ]
}
