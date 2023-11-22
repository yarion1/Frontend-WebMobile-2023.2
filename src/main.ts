// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import axios from './services/api';
import { registerPlugins } from '@/plugins';
import './assets/css/style.css';

const app = createApp(App);

// Configurando o Axios como um plugin global
app.config.globalProperties.$http = axios;

// Registrando outros plugins
registerPlugins(app);

app.mount('#app');
