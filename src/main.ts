import '../node_modules/primevue/resources/themes/saga-blue/theme.css';
import '../node_modules/primevue/resources/primevue.min.css';
import '../node_modules/primeicons/primeicons.css';
import '../node_modules/primeflex/primeflex.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import { abilitiesPlugin } from '@casl/vue';
import ToastService from 'primevue/toastservice';
import { setupI18n } from './i18n';
import authenticator from './lib/auth';

const i18n = setupI18n({ locale: import.meta.env.FINHAVA_DEFAULT_LOCALE });
const app = createApp(App);

await authenticator.checkForActiveAccount();
const abilities = await authenticator.getActiveAccountAbilities();

app.use(router);
app.use(PrimeVue);
app.use(i18n);
app.use(ToastService);
app.use(abilitiesPlugin, abilities);

app.mount('#app');
