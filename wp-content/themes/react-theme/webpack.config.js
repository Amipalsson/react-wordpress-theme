const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
    mode: 'development',
    entry: {
        bundle: path.join(__dirname, 'src', 'index.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'wp-content/themes/ap-react-theme/dist/img/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            proxy: {
                target: 'https://localhost'
            },
            files: ['**/*.php'],
            cors: true,
            reloadDelay: 0,
            open: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.[name].css',
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    webpackConfig.mode = 'production';
}

module.exports = webpackConfig;
