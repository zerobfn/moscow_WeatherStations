var merge = require('webpack-merge')

module.exports = {
    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .use('html-loader')
            .loader('html-loader')
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options =>
                merge(options, {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href',
                        'vl-style-icon': 'src',
                    },
                })
            )
    }
}