import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import './assets/main.css';
import './node_modules/primeflex/primeflex.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount('#app');
