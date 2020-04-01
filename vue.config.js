module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    // proxy: 'http://127.0.0.1:9000'
    proxy: {
      '/api': {
        target: 'http://localhost:3500/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}