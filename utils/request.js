/**
 * 文档地址：https://github.com/lei-mu/luch-request/tree/master/docs/guide/3.x
 * npm 地址：https://www.npmjs.com/package/luch-request
 */
import Request from 'luch-request'
import { isArray, isObject, stringify } from './index'

const request = new Request()

// 全局的 http code 配置，可根据实际情况删改
const codes = {
  // 成功
  success: { code: 0, message: '' },
  // 未登录
  logout: { code: 601, message: '请先登录后再操作' },
  // 服务器异常
  error: { code: 500, message: '服务器异常' },
  // 无权限访问
  noPermission: { code: 403, message: '无权限访问' },
  // 接口不存在
  notFound: { code: 404, message: '接口不存在' }
}

// 接口配置
// 本地
const baseURL = 'http://192.168.1.101:9301/api'
// 测试环境
// const baseURL = 'https://test.example.com/api'
// 线上环境
// const baseURL = 'https://example.com/api'

// 全局配置
request.setConfig((config) => {
  return {
    ...config,
    baseURL,
    // 设置请求头
    header: {
      'content-type': 'application/json',
      // 小程序版本号，不一定跟发布的一致，这个主要是内部自己维护的一个变量，用来控制 api 返回数据的
      'wechat-version': '1.0.0',
      // 平台标识
      platform: 'wxapp',
      // 产品
      product: 'product'
    },
    // 跨域请求时是否携带凭证
    withCredentials: true
  }
})

// 设置请求拦截器
request.interceptors.request.use(config => {
  // 将 GET 的数组和对象参数转换成字符串
  if (config.method === 'GET') {
    Object.entries(config.params).forEach(([key, value]) => {
      if (isArray(value) || isObject(value)) {
        config.params[key] = stringify(value)
      }
    })
  }
  return config
})

// 设置响应拦截器
request.interceptors.response.use(res => {
  // 数据容错
  res.data = res.data || {}
  if (res.data.code === codes.success.code) {
    return Promise.resolve(res.data)
  }
  return Promise.reject(res.data)
}, error => {
  const code = error.statusCode
  if (code === 502) {
    uni.redirectTo({
      url: '/pages/maintain/maintain'
    })
    return
  }
  let tips = error.data && error.data.message ? error.data.message : codes.error.message
  // 如果接口没有返回错误提示信息，从自定义的错误码里面读取错误提示
  if (!tips) {
    Object.entries(codes).find(([key, value]) => {
      if (value.code === code && value.message) {
        tips = value.message
        return true
      }
      return false
    })
  }
  // 如果当前「没有关闭自动提示」且「存在错误提示」就抛出错误提示
  if (!error.config.custom.closeAutoTips && tips) {
    uni.showToast({ title: tips, duration: 2000, icon: 'none', mask: true })
  }
  return Promise.reject(error.data)
})

export default request
