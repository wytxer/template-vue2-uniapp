import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用户信息
    user: {
      // 登陆状态
      logged: false,
      // 用户 id
      userId: '',
      // 昵称
      nickName: '',
      // 手机号码
      phone: '',
      // 头像
      avatarUrl: '/static/default-avatar.png'
    },
    // 全局配置
    config: {},
    // 系统初始的宽高信息
    sizeConfig: {
      headerBtnRect: {
        top: 0, right: 0, left: 0, bottom: 0, width: 0, height: 0
      },
      systemInfo: {
        windowWidth: 375,
        windowHeight: 750,
        platform: ''
      }
    }
  },
  mutations: {
    // 登陆
    login (state, data) {
      state.user.logged = !!data.userId
      state.user.userId = data.userId
      state.user.nickName = data.nickName
      state.user.avatarUrl = data.avatarUrl
      state.user.countryId = data.countryId
      state.user.phone = data.phone
    },
    // 登出
    logout (state) {
      state.user.logged = false
      state.user.userId = ''
      state.user.nickName = ''
      state.user.avatarUrl = ''
    },
    // 设置初始的尺寸信息
    setHeaderBtnRect (state, data) {
      state.sizeConfig.headerBtnRect = {
        ...data
      }
    },
    // 设置系统初始尺寸信息
    setSystemInfo (state, data) {
      state.sizeConfig.systemInfo = { ...data }
    },
    // 修改用户信息
    setUserInfo (state, data) {
      if (data.avatarUrl) {
        state.user.avatarUrl = data.avatarUrl
      }
      if (data.nickName) {
        state.user.nickName = data.nickName
      }
    }
  },
  actions: {
    // 获取用户信息
    queryUserInfo ({ commit }) {
      return request.get('/v1/user/info', { custom: { closeAutoTips: true } })
        .then(res => {
          const data = res.data || {}
          commit('login', data)
          return data
        })
        .catch(() => {})
    }
  }
})

export default store
