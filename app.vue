<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  globalData: {
    systemInfo: {},
    headerBtnRect: {}
  },
  onLaunch (event) {
    console.log('App Launch')

    // 分享朋友圈进来的场景
    if (event.scene === 1154) {
      console.log('朋友圈分享')
    } else {
      // 静默登录
      uni.login({
        provider: 'weixin',
        success: ({ code, errMsg }) => {
          if (errMsg === 'login:ok') {
            this.$request.post('/v1/user/wechatLogin', { code }, { custom: { closeAutoTips: true } })
              .then((user) => {
                this.$store.commit('login', user.data || {})
              })
          }
        },
        fail (error) {
          console.error(error)
          uni.showToast({ title: '未知异常', duration: 2000 })
        }
      })
    }

    // 页面拦截
    uni.addInterceptor('navigateTo', {
      invoke (event) {
        const pages = getCurrentPages()
        if (pages.length >= 10) {
          uni.redirectTo({
            url: event.url
          })
          return false
        }
        return true
      }
    })

    // 记录顶部胶囊位置信息
    this.globalData.headerBtnRect = uni.getMenuButtonBoundingClientRect()
    this.$store.commit('setHeaderBtnRect', this.globalData.headerBtnRect)
    const systemInfo = uni.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    const { windowWidth, windowHeight, platform } = systemInfo
    this.$store.commit('setSystemInfo', { windowWidth, windowHeight, platform })
  },
  onShow () {
    console.log('App Show')
    // 获取用户信息
    this.$store.dispatch('queryUserInfo')
  },
  onHide () {
    console.log('App Hide')
  }
}
</script>
