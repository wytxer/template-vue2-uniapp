<template>
  <view class="page-maintain">
    <view>
      <view>
        <image class="page-maintain__icon" src="/static/icon-502.png" mode="widthFix" />
      </view>
      <view class="page-maintain__default-text">目前正在维护更新中</view>
      <view class="page-maintain__text">我们将在几小时内或更长的时间内完成维护更新，给您带来的不便敬请谅解</view>
    </view>
  </view>
</template>

<style lang="scss">
  .page-maintain {
    padding: 32rpx;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-align: center;
    &__icon {
      width: 236rpx;
      height: 236rpx;
      margin-bottom: 60rpx;
    }
    &__default-text {
      font-size: 28rpx;
      color: #575757;
      margin-bottom: 24rpx;
    }
    &__text {
      color: #c2c2c2;
      font-size: 20rpx;
    }
  }
</style>
