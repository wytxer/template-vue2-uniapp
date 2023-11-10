<template>
  <ex-view title="首页" :showBack="false">
    <view class="page-index">
      <image src="/static/logo.png" class="page-index__logo" />
    </view>
  </ex-view>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .page-index {
    min-height: 100vh;
    padding-top: 200px;
    text-align: center;
    &__logo {
      width: 140px;
      height: 140px;
      border-radius: 50%;
    }
  }
</style>
