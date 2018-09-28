import Vuex from "vuex";
import Vue from "vue";
import {http} from '@/http-common';

Vue.use(Vuex);

const sourceMap = {
    currencies: {type: 'remote', url: '/currencies'},
    categories: {type: 'remote', url: '/categories'},
    parts: {type: 'remote', url: '/parts'},
    options: {type: 'remote', url: '/options'},
    groups: {type: 'remote', url: '/groups'},
    stores: {type: 'remote', url: '/stores'},
};
const globalSources = [
    'option_types', 'active_or_disabled'
];
export default new Vuex.Store({
    state: {
        sourcesProcessed: {},
        sources: {},
        batch: [],
        batchStatus: false,
    },
    getters: {
        getList: (state) => (source) => {
            let newArr = {};
            let sm = sourceMap[source];
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
        },


    },
    mutations: {
        flush(state, source) {
            let add = {};
            add[source] = false;
            state.sourcesProcessed = {...state.sourcesProcessed, ...add};
        },
        setData(state, payload) {
            let source = {};
            source[payload.source] = payload.data;
            state.sources = {...state.sources, ...source};
        },
        setProcessed(state, source) {
            let add = {};
            add[source] = true;
            state.sourcesProcessed = {...state.sourcesProcessed, ...add};
        },

        startBatch(state) {
            state.batch = [];
            state.batchStatus = true;
        },
        addToBatch(state, payload) {
            if (!state.sourcesProcessed[payload.source] && state.batch.indexOf(payload.source) == -1) {
                state.batch.push(payload.source);
            }
        },
        flushBatch(state) {
            state.batchStatus = false;
            state.batch = [];
        },

    },
    actions: {
        addGlobalSources({commit}) {
            for(let i in globalSources) {
                commit('addToBatch', {source: globalSources[i]});
            }

        },
        loadSource({commit, state}, name) {
            let sm = sourceMap[name];
            if (!sm) {
                console.log('[APP] Invalid source:', name);
                return;
            }
            if (!state.sourcesProcessed[name]) {
                if (sm.type == 'remote') {
                    http.get(sm.url).then(response => {
                        commit('setData', {source: name, data: response.data});
                        commit('setProcessed', name);
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
                        commit('setProcessed', name);
                    }
                    commit('flushBatch');
                });
            }
        },

    }
})