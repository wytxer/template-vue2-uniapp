<template>
  <view class="ex-header" :style="navStyle">
    <uni-icons v-if="showBack" type="arrowleft" :style="iconStyle" :color="iconColor" size="24" class="ex-header__icon" @click="onGotoBack()"></uni-icons>
    <view v-if="title" class="ex-header__title" :style="titleStyle">{{ title }}</view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
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
    // 当前页面滚动的距离
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
      sizeConfig: state => state.sizeConfig
    }),
    navRect () {
      const { top, bottom, right } = this.sizeConfig.headerBtnRect
      const { windowWidth, windowHeight } = this.sizeConfig.systemInfo
      const paddingBottom = 10
      return {
        windowWidth,
        windowHeight,
        top,
        // 导航高度
        height: bottom + paddingBottom,
        // 导航底部内间距
        paddingBottom,
        // 导航右内间距
        paddingRight: windowWidth - right
      }
    },
    navStyle () {
      const { windowHeight, top, height, paddingBottom, paddingRight } = this.navRect
      const [r, g, b] = this.backgroundColor
      let opacity = 1
      if (this.autoGradual) {
        const newOpacity = this.scrollTop / (windowHeight / 2)
        if (newOpacity <= 0) {
          opacity = 0
        } else {
          opacity = Math.min(newOpacity, 1)
        }
      }
      return `height: ${height}px; padding: ${top}px ${paddingRight}px ${paddingBottom}px ${paddingRight}px; background-color: rgba(${r}, ${g}, ${b}, ${opacity})`
    },
    iconStyle () {
      const { top, paddingRight } = this.navRect
      return `top: ${top + 4}px; left: ${paddingRight}px`
    },
    titleStyle () {
      return `line-height: ${this.sizeConfig.headerBtnRect.height}px`
    }
  },
  methods: {
    onGotoBack () {
      // 当只有一个页面时返回到首页
      if (getCurrentPages().length === 1) {
        uni.navigateTo({
          url: '/pages/index/index'
        })
      } else {
        uni.navigateBack({})
      }
    }
  }
}
</script>

<style lang="scss">
  .ex-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 6;
    width: 100%;
    &__icon {
      position: absolute;
      top: 8rpx;
      left: 14rpx;
    }
    &__title {
      font-size: 28rpx;
      color: #000000;
      text-align: center;
      padding: 0 180rpx;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
