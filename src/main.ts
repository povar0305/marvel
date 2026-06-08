import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import '@/styles/tailwind.css'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import '@/styles/typography.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // базовые стили
import 'tippy.js/themes/light.css' // светлая тема (опционально)
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueTippy, {
  directive: 'tippy',
  component: 'tippy',
  defaultProps: {
    allowHTML: false,
    delay: [300, 0],
    animation: 'fade',
  },
})

app.mount('#app')
