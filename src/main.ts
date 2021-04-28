import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.params = {
    ...config.params
  }
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
})
axios.get('columns?currentPage=1&pageSize=5').then(resp => {
  console.log(resp.data)
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
