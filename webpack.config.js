const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = [
    {
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
    },
];
const getFileLoader = (regExp) => ({
    test: regExp,
    use: ['file-loader'],
});
const getStyleLoader = (regExp, additionalLoaders) => {
    const rules = {
        test: regExp,
        use: ['style-loader', 'css-loader'],
    };
    if (additionalLoaders && additionalLoaders.length) {
        additionalLoaders.forEach((loader) => rules.use.push(loader));
    }
    return rules;
};
const getPath = (url) => path.resolve(__dirname, `src/${url}`);

module.exports = {
    entry: getPath('index.js'),
    module: {
        rules: [
            getStyleLoader(/\.css$/),
            getFileLoader(/\.(ttf|woff|eot)$/),
            getFileLoader(/\.(jpg|jpeg|svg|png)$/),
            getStyleLoader(/\.s[ac]ss$/, ['sass-loader']),
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(test|spec).(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        ...pages.map((config) => new HTMLWebpackPlugin(config)),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
            ],
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 7777,
    },
};