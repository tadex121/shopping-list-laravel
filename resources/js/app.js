import { createApp } from 'vue';
import store from './store';

import Lists from './components/ListsComponent.vue';
import ListsForm from './components/lists/ListsFormComponent.vue';

import './bootstrap';

const app = createApp({});
app.use(store);

app.component('lists-component', Lists);
app.component('lists-form-component', ListsForm);

app.mount('#app');