// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import {sync} from 'vuex-router-sync'
import * as uiv from 'uiv'
import FieldText from '@/components/System/Fields/Text'
import FieldAutocomplete from '@/components/System/Fields/Autocomplete'
import FieldSelect from '@/components/System/Fields/Select'
import FieldJsonList from '@/components/System/Fields/JsonList'

import InlineCrud from '@/components/System/InlineCrud'



Vue.use(uiv);

Vue.component('field-text', FieldText);
Vue.component('field-autocomplete', FieldAutocomplete);
Vue.component('field-select', FieldSelect);
Vue.component('field-json-list', FieldJsonList);

Vue.component('inline-crud', InlineCrud);
Vue.config.productionTip = false;

sync(store, router);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
