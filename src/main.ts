import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import createDirective from './utils/directive'
import '@/utils/global'
import '@/assets/styles/app.base.scss'
import '@/assets/styles/common.scss'

const app = createApp(App)

createDirective(app)

if ('serviceWorker' in navigator && process.env.APP_NODE_ENV === 'prod') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      console.log('SW registered ', registration)
    }).catch((registrationError) => {
      console.log('SW registration failed ', registrationError)
    })
  })
}

app.use(store, key)
app.use(router).mount('#app')
