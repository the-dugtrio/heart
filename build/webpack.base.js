var path = require('path');

module.exports = {
    entry: './entry.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                loader: 'file-loader?name=[hash:12].[ext]',
            },
            {
                test: /\.(jpe?g|png|gif)(\?.+)?$/,
                loader: 'url-loader?name=[hash:12].[ext]&limit=25000',
            },
        ]
    }
}
