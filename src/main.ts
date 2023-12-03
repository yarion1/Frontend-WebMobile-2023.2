// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import {tmdbClient} from './services/api';
import { registerPlugins } from '@/plugins';
import './assets/css/style.css';
import router from './router';

const app = createApp(App);

// Configurando o Axios como um plugin global
app.config.globalProperties.$http = tmdbClient;

// Registrando outros plugins
registerPlugins(app);

app.use(router).mount('#app');
