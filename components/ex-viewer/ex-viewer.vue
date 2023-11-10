<template>
  <uni-popup ref="popup" type="center" :maskClick="true">
    <view class="ex-viewer" @click="$refs.popup.close()">
      <swiper class="ex-viewer__swiper" @change="onImageChange" :current="current" :circular="circular" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration">
        <swiper-item v-for="(url, i) in imgs" :key="i">
          <view class="ex-viewer__img" :style="{backgroundImage: `url(${url})`}"></view>
        </swiper-item>
      </swiper>
      <view class="ex-viewer__amount" v-if="imgs.length > 0">{{ current + 1 }} / {{ imgs.length }}</view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  data () {
    return {
      indicatorDots: false,
      autoplay: false,
      duration: 500,
      circular: true,
      current: 0
    }
  },
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showModal (current) {
      this.current = current || 0
      this.$refs.popup.open()
    },
    // 图片切换
    onImageChange (e) {
      this.current = e.target.current
    }
  }
}
</script>

<style lang="scss" scoped>
  .ex-viewer {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    &__swiper {
      width: 100vw;
      height: 100vh;
    }
    &__img {
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      height: 100%;
    }
    &__amount {
      position: fixed;
      color: #fff;
      left: 0;
      bottom: 20rpx;
      text-align: center;
      width: 100%;
    }
  }
</style>
