const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}


const publicPath = process.env.VUE_APP_BASE_PATH || '/'
const port = parseInt(process.env.VUE_APP_DEV_PORT || '8080')

/**
 * @type { import("@vue/cli-service").ProjectOptions }
 */
module.exports = defineConfig({
    transpileDependencies: false,
    lintOnSave: false,

    publicPath,

    outputDir: process.env.VUE_APP_OUTPUT_DIR || 'mp',
    productionSourceMap: process.env.NODE_ENV === "production" ? false : true,

    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '_c':  resolve('src/components'),
            }
        },
    },
    chainWebpack: config => {
        config.entry.app = ['babel-polyfill', './src/main.js']
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE;
            return args;
        });
    },

    /** 
     * @type { import("webpack-dev-server").Configuration }
     */
    devServer: {
        host: '0.0.0.0',
        port: port,
        /**
         * Proxying some URLs can be useful when you have a separate API backend development server and you want to send API requests on the same domain. 
         */
        proxy: {
            [process.env.VUE_APP_API_BASE_PATH]: {
                target: process.env.VUE_APP_API_PROXY_TARGET,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_API_BASE_PATH]: '',
                },
            },
        },
        allowedHosts: 'all'
    },
})
