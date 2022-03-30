module.exports = {
  publicPath: "./",
  outputDir: "dist",
  devServer: {
    disableHostCheck: true,
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  lintOnSave: false, // 关闭eslint检查
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
