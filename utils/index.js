/**
 * 全局的类方法工具库，身份证校验、数据处理、转换等
 *   组件内通过 this.$utils 调用，如：this.$utils.testMobile(1)
 *   组件外部需要引入工具类
 */

// 手机号校验
export function testMobile (value) {
  return /^[1]([3-9])[0-9]{9}$/.test(value)
}

// 密码校验，8 至 16 位大小写字母数字下划线特殊字符组合
export function testPassword (value) {
  return /^[a-zA-Z0-9_`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]{8,16}$/.test(value)
}

// 身份证校验
export function testIdentity (value) {
  return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
}

// 生成随机字符串
const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
export function createId (len = 16) {
  let str = ''
  for (let a = 0; a < len; a += 1) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}

// 判断一个值是否是字符串
export function isString (v) {
  return Object.prototype.toString.call(v) === '[object String]'
}

// 判断一个值是否是对象
export function isObject (v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

// 判断一个值是否是空对象
export function isObjectEmpty (v) {
  return Object.keys(v).length === 0
}

// 判断一个值是否是数组
export function isArray (v) {
  return Object.prototype.toString.call(v) === '[object Array]'
}

// 判断一个值是否是 Boolean 类型
export function isBoolean (v) {
  return Object.prototype.toString.call(v) === '[object Boolean]'
}

// 参数编码
export function encode (str) {
  return encodeURIComponent(str)
}

// 参数解码
export function decode (str) {
  return decodeURIComponent(str)
}

// JSON 对象转字符串
export function stringify (v) {
  return JSON.stringify(v)
}

// JSON 字符串转对象
export function parse (v) {
  return JSON.parse(v)
}

// 浅拷贝
export function clone (v) {
  return parse(stringify(v))
}

// 零填充
export function fullZero (n) {
  return n < 10 ? `0${n}` : n
}

// 对象转字符串
export function objectToString (obj) {
  return Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('&')
}

// 版本号对比
export function compareVersion (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

// 格式化价格
export const formatPrice = (price) => {
  if (!price || price <= 0) return 0
  return (price / 100).toFixed(2)
}
