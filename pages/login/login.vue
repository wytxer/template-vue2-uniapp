<template>
  <ex-view iconColor="#ffffff">
    <view class="page-login">
      <image src="/static/bg.png" mode="aspectFill" class="page-login__bg" />
      <view class="action-footer">
        <image class="action-footer__logo" src="/static/logo.png" />
        <button type="primary" class="action-footer__button" :loading="phoneLoading" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录</button>
      </view>
    </view>
  </ex-view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 获取手机号按钮的状态
      phoneLoading: false,
      // 重定向地址
      redirectUrl: '',
      query: null
    }
  },
  // 分享
  onShareAppMessage () {
    return {
      title: '分享标题',
      path: '/pages/login/login'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  onLoad (query) {
    this.query = query
  },
  onShow () {
    let redirectUrl = '/pages/index/index'
    if (this.query.redirectUrl) {
      redirectUrl = this.$utils.decode(this.query.redirectUrl)
    }
    this.redirectUrl = redirectUrl
  },
  methods: {
    // 登陆成功之后获取手机号
    getPhoneNumber (e) {
      if (!this.user.userId) {
        uni.showToast({ title: '请先授权登录', icon: 'none' })
        return
      }
      if (e.detail.errMsg === 'getPhoneNumber:ok') {
        const { code } = e.detail
        const userId = this.user.userId
        this.phoneLoading = true
        // 解密手机号并保存
        this.$request.post('/v1/user/wechatGetPhone', { userId, code })
          .then(res => {
            this.$store.commit('login', res.data || {})
            uni.reLaunch({ url: this.redirectUrl })
          })
          .finally(() => {
            this.phoneLoading = false
          })
      } else {
        uni.showToast({ title: '手机号获取失败', icon: 'none' })
      }
    }
  }
}
</script>

<style lang="scss">
  .page-login {
    width: 100%;
    height: 100vh;
    position: relative;
    &__bg {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
    }
    .action-footer {
      width: 100%;
      height: 100%;
      padding: 296rpx 32rpx 190rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      &__logo {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        margin: 0 auto 60rpx;
      }
      &__button {
        margin: 0 auto;
        color: #000000;
        background-color: #FFFFFF;
        border-radius: 66rpx;
        width: 444rpx;
        height: 131rpx;
        line-height: 131rpx;
        text-align: center;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
</style>
