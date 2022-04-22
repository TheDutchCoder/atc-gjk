// eslint-disable-next-line no-unused-vars
import css from './index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { manager } from '#/loaders'

manager.onLoad = () => {
  createApp(App).mount('#app')
}
