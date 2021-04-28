module.exports = {
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    host: '0.0.0.0',
    port: '8081',
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://api.vikingship.xyz/api/', //
        // target: "http://192.168.1.102:8888", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
