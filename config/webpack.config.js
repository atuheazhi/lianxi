const path=require('path');//加载path模块
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    mode:"production",
    entry:{
        index:'./src/index.js',//入口 上级一个点
        product:'./src/product.js'
    },
    output:{//打包入口
        path:path.resolve(__dirname,'../dist/'),//打包文件输出路径 绝对路径 获取当前绝对路径
        // filename:'bundle.js'//打包文件输出
        filename:'[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:MiniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            },
            // {
            //     test:/\.(jpg|png|gif|webp|jpeg)$/,
            //     use:[
            //         {loader:'file-loader'}
            //     ]
            // }
            {
                test:/\.(jpg|png|gif|webp|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:102400
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"网页标题",
            template:'./src/tpl.html',
            inject:'head',
            minify:{
                removeComments:true,
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            filename:'index_1.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[hash].css'
        })
    ]
}