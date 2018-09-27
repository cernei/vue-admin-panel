module.exports = {
  baseUrl: '/vue-admin-panel',
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
        .loader('html-loader')
        .end()
  }
}