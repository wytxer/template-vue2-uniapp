import Vue from 'vue'
import App from './app'
import store from './store/index'

import request from '@/utils/request'
import * as $const from '@/utils/const'
import * as utils from '@/utils/index'

import 'weapp-cookie'
import './app.scss'

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$const = $const
Vue.prototype.$utils = utils

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})

app.$mount()
