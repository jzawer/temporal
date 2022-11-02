import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

import "./assets/main.css";
import "../node_modules/primevue/resources/themes/saga-blue/theme.css";
import "../node_modules/primevue/resources/primevue.min.css";
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import { setupI18n } from "./i18n";

const i18n = setupI18n({ locale: import.meta.env.FINHAVA_DEFAULT_LOCALE });
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(i18n);

app.mount("#app");
