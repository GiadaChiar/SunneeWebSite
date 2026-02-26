const path = require('path');

module.exports = {
    // 🔹 Entry point: punta al tuo file TypeScript
    entry: './src/index.ts',
     // 🔹 Output del bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true,// pulisce la cartella dist ad ogni build
    },
      // 🔹 Modalità sviluppo
    mode: 'development',
     // 🔹 Risoluzione estensioni
    resolve: {
    extensions: ['.ts', '.js'], // così Webpack sa leggere .ts e .js
    },
    // 🔹 Loader per TypeScript e SCSS
    module: {
        rules: [
        {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        ],
    },
    // 🔹 Dev server
    devServer: {
        static: './dist',
        open: true,
        hot: true,
    },
};
