<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  onLoad (options) {
    if (options.title) {
      uni.setNavigationBarTitle({ title: options.title })
    }
    this.url = decodeURIComponent(options.url)
  }
}
</script>
