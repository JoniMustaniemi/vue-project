import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createVuestic } from 'vuestic-ui';
import 'vuestic-ui/css';

// Create the Vue app
const app = createApp(App);

// Create Pinia store instance
const pinia = createPinia();

// Use Vuestic UI and Pinia
app.use(createVuestic());
app.use(pinia);

// Mount the app
app.mount('#app');
