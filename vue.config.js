module.exports = {
  configureWebpack: {
    resolve: {
      // 解决打包时报错 @dcloudio 找不到 json 配置文件的问题
      symlinks: false
    }
  }
}
