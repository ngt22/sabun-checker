import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark-theme',
            cssLayer: false
        }
    }
});

app.mount('#app');