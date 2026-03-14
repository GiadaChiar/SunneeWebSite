const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//to reduce impact to images
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");



module.exports = {
    // 🔹 Entry point: punta al tuo file TypeScript
    entry:{
        index:'./src/js-ts/index.ts',
        aboutUs:'./src/js-ts/aboutUs.ts',
        logIn:'./src/js-ts/logIn.ts',

    },
     // 🔹 Output del bundle
    output: {
        filename: '[name].bundle.js',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            
            },
                {
                test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    // 🔹 Dev server
    devServer: {
        static: './dist',
        port: 9001,
        open: true,
        compress: true,
    },
    //html plugin

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks:['index']
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/aboutUs.html',
            filename: 'aboutUs.html',
            chunks:['aboutUs']
        }),
        new HtmlWebpackPlugin({
            template: './src/components/form.html',
            filename: 'form.html',
            chunks: ['form']
        }),
        new HtmlWebpackPlugin({
            template: './src/components/menu.html',
            filename: 'menu.html',
            chunks: ['menu']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/logIn.html',
            filename: 'logIn.html',
            chunks: ['logIn']
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/logInSections.html',
            filename: 'logInSections.html',
            chunks: ['logInSections']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/admin.html',
            filename: 'admin.html',
            chunks:['admin']
        }),
        new MiniCssExtractPlugin({
                filename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/style/img', to: 'img' },
                { from: 'src/style/video', to: 'video' },
               // { from: 'src/menu.html', to: 'menu.html'},
            ],
        }),
        //AGGIUNGI DOPO PER OTTIMIZZARE LE IMMAGINI -----------------------------TROPPO LENTO ORA 
        /*new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                // qui dentro le opzioni per imagemin
                    plugins: [
                        ["mozjpeg", { quality: 70 }],
                        ["pngquant", { quality: [0.6, 0.8] }],
                        ["svgo"],   // se hai SVG
                        ["gifsicle"],
                    ],
                },
            },
        }),*/
    ],
};
