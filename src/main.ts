import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  store.commit('setError', {
    status: false,
    message: ''
  })
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
}, e => {
  console.log(e)
  const { error } = e.response.data
  store.commit('setError', {
    status: true,
    message: error
  })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
