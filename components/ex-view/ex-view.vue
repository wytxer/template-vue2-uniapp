<template>
  <view class="ex-view" :style="viewStyle">
    <ex-header v-if="customNavigationStyle" :title="title" :iconColor="iconColor" :backgroundColor="backgroundColor" :autoGradual="autoGradual" :scrollTop="scrollTop" :showBack="showBack" />
    <slot v-if="showPage"></slot>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    // 是否要检查当前用户登录状态
    checkLogin: {
      type: Boolean,
      default: false
    },
    // 是否要检查当前用户手机号授权
    checkPhone: {
      type: Boolean,
      default: false
    },
    // 当前页面是否自定义了导航顶部样式
    customNavigationStyle: {
      type: Boolean,
      default: true
    },
    // 是否自动计算顶部的间距
    autoPaddingTop: {
      type: Boolean,
      default: false
    },
    // 自定义的导航标题
    title: {
      type: String,
      default: ''
    },
    // 导航左边的图标颜色
    iconColor: {
      type: String,
      default: '#000000'
    },
    // 导航背景色，仅支持 rgb 类型
    backgroundColor: {
      type: Array,
      default: () => [0, 0, 0]
    },
    // 是否开启背景色渐变
    autoGradual: {
      type: Boolean,
      default: true
    },
    // 当前页面滚动的距离，传递给 ex-header 组件显示背景色
    scrollTop: {
      type: Number,
      default: 0
    },
    // 是否显示返回
    showBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      sizeConfig: state => state.sizeConfig,
      logged: state => state.user.logged,
      phone: state => state.user.phone
    }),
    viewStyle () {
      return this.customNavigationStyle && this.autoPaddingTop ? `padding-top: ${this.sizeConfig.headerBtnRect.bottom}px` : ''
    },
    showPage () {
      return this.checkLogin === false ? true : this.logged
    }
  },
  watch: {
    logged () {
      if (this.logged) {
        uni.hideLoading()
        this.gotoGetPhone()
      }
    }
  },
  created () {
    if (!this.logged) {
      uni.showLoading({ title: '加载中' })
    } else {
      this.gotoGetPhone()
    }
  },
  methods: {
    gotoGetPhone () {
      if (this.checkPhone && this.logged && !this.phone) {
        uni.showLoading({ title: '加载中' })
        this.$nextTick(() => {
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1] || {}
          uni.redirectTo({
            url: `/pages/login/login?redirectUrl=${this.$utils.encode(currentPage.$page.fullPath)}`,
            success () {
              uni.hideLoading()
            }
          })
        })
      }
    }
  }
}
</script>
