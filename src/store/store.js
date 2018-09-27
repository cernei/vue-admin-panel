import Vuex from "vuex";
import Vue from "vue";
import {http} from '@/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sourceMap: {
            currencies: {type: 'remote', url: '/currencies'},
            categories: {type: 'remote', url: '/categories'},
            products: {type: 'remote', url: '/products'},
            parts: {type: 'remote', url: '/parts'},
            options: {type: 'remote', url: '/options'},
            groups: {type: 'remote', url: '/groups'},
            stores: {type: 'remote', url: '/stores'},
        },
        sources: {},
        batch: [],
        batchStatus: false,
        globalsProcessed: false
    },
    getters: {
        getList: (state) => (source) => {
            let newArr = {};
            let sm = state.sourceMap[source];
            if (source && sm) {
                let pluck = sm.pluck ? sm.pluck : ['id', 'name'];
                let items = state.sources[source];
                for (var i in items) {
                    newArr[items[i][pluck[0]]] = items[i][pluck[1]];
                }
            }
            return newArr;
        },
        byKey: (state) => (source, key) => {
            let items = state.sources[source];
            let newArr = {};
            for (var i in items) {
                newArr[items[i][key]] = items[i];
            }
            return newArr;
        },
        getSourceValue: (state, getters) => (field, item) => {

            let val = typeof item[field.name] != 'undefined' ? item[field.name] : (item['pivot'] ? item['pivot'][field.name] : '');
            let ret = '';
            if (field.source) {
                let source = state.sources[field.source];
                if (source) {
                    ret = getters.byKey(field.source, 'id')[val]['name'];
                } else if (field.source == 'option_values') {
                    // TODO make abstract ('dependant value')
                    let source = getters[field.source](item[field.dependsOn]);
                    ret = source[val] ? source[val]['name'] : 'undef';
                } else {
                    ret = '---';
                }
            } else {
                ret = val;
            }

            return ret;

        },
        option_values: (state, getters) => (key) => {
            let options = getters.byKey('options', 'id');
            options = options[key] ? options[key]['values'] : '[]';
            options = JSON.parse(options) || [];

            let newArr = [];
            for (let i in options) {
                newArr.push({id: i, name: options[i]});
            }
            return newArr;
        }
    },
    mutations: {
        flush(state, payload) {
            state.sourceMap[payload.source] = {...state.sourceMap[payload.source], processed: false};
        },
        setData(state, payload) {
            let source = {};
            source[payload.source] = payload.data;
            state.sources = {...state.sources, ...source};
        },
        setProcessed(state, payload) {
            state.sourceMap[payload.source] = {...state.sourceMap[payload.source], processed: payload.status};
        },
        setError(state, payload) {
            state.error[payload.source] = {...state.sourceMap[payload.source], processed: payload.status};
        },

        startBatch(state) {
            state.batch = [];
            state.batchStatus = true;
        },
        addToBatch(state, payload) {
            state.batch.push(payload.source);
        },
        flushBatch(state) {
            state.batchStatus = false;
            state.batch = [];
        },

        setGlobalsProcessed(state) {
            state.globalsProcessed = true;
        },
    },
    actions: {
        loadSource({commit, state}, name) {
            let sm = state.sourceMap[name];
            if (!sm) {
                console.log('[APP] Invalid source:', name);
                return;
            }
            if (!sm.processed) {
                if (sm.type == 'remote') {
                    http.get(sm.url).then(response => {
                        commit('setData', {source: name, data: response.data});
                        commit('setProcessed', {source: name, status: true});
                    });
                } else {

                }
            }
        },
        endBatch({commit, state}) {
            if (state.batch.length) {
                http.get('/batch', {params: {arr: state.batch.join(',')}}).then(response => {
                    for (let name in response.data) {
                        commit('setData', {source: name, data: response.data[name]});
                        commit('setProcessed', {source: name, status: true});
                    }
                    commit('flushBatch');
                });
            }
        },
        loadGlobals({commit, state}) {
            if (state.globalsProcessed) {
                http.get('/globals').then(response => {
                    for (var sourceName in response.data) {
                        commit('setData', {source: sourceName, data: response.data[sourceName]});
                        commit('setProcessed', {source: sourceName, status: true});
                    }
                    commit('setGlobalsProcessed');
                });
            }
        },
    }
})