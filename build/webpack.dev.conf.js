'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const app = express()//请求server
var appData = require('../static/data.json')//加载本地数据文件
var store=appData.store

var apiRoutes = express.Router()
app.use('/api', apiRoutes)//通过路由请求数据

//定义状态码 这个随意定义
//var isOk = 1




const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
    ,
    before(app) {
      app.get('/api/store', (req, res) => {
        res.json({
          errno: 0,
          data: store
        })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
      })

    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})



/*

//定义状态码 这个随意定义
var isOk = 1
var Mock = require('mockjs')
var aipRouter = express.Router()

//获取news数据
aipRouter.get('/news', function (req, resp) {
    var data = Mock.mock({
        'categorys|1-3': [{
            'id|10': 1,
            "url": "@url",
            "domain": "@domain",
            "email": "@email",
            "paragraph": "@paragraph",
            "sentence": "@sentence"
        }]
   })
    var net = JSON.stringify(data, null, 4)
    resp.json({
        ok: isOk,
        data: net
    })
})

//获取dailies数据
aipRouter.get('/dailies', function (req, resp) {
    var data = Mock.mock({
        'categorys|1-3': [{
            'id|10': 1,
            "url": "@url",
            "domain": "@domain",
            "email": "@email",
            "paragraph": "@paragraph",
            "sentence": "@sentence"
        }]
    })
    var net = JSON.stringify(data, null, 4)
    resp.json({
        ok: isOk,
        data: net
    })
})

//获取zalent数据
aipRouter.get('/zalent', function (req, resp) {
    var data = Mock.mock({
        'categorys|1-3': [{
            'id|10': 1,
            "url": "@url",
            "domain": "@domain",
            "email": "@email",
            "paragraph": "@paragraph",
            "sentence": "@sentence"
        }]
    })
    var net = JSON.stringify(data, null, 4)
    resp.json({
        ok: isOk,
        data: net
    })
})
//写入express 这里可以使用app 因为express 存放在app变量
//这里有两个参数 这里是使用了一个斜杠 具体要看你路由配置

app.use('/api', aipRouter)

*/












