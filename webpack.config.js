const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
        child_process: false,
        fs: false,
        net: false,
        path: false,
        os: false,
        util: require.resolve('util'),
        http: require.resolve('http-browserify'),
        https: require.resolve('https-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('readable-stream'),
    },
    alias: {
        // To avoid blotting up the `bn.js` library all over the packages
        // use single library instance.
        'bn.js': path.resolve(__dirname, 'node_modules/bn.js'),
    },
},
};
