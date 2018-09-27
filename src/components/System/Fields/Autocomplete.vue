<script>
    var _ = require('lodash');

    export default {
        props: ['value', 'field'],
        data: function () {
            return {
                items: [],
                query: '',
                fields: [],
                loading: false
            }
        },
        watch: {
            value: function () {
                this.query = this.$eventHub.sources[this.field.source][this.value];
            },
        },
        methods: {
            onInput: _.debounce(function (value) {
                this.query = value;
                if (value.length >= 2) {
                    this.loading = true;
                    if (!this.url) this.url = '/' + this.field.source;

                    this.$http.get('/api' + this.url, {'name': value}).then(response => {
                        this.items = response.body;
                        this.loading = false;
                    }, response => {
                        this.loading = false;
                    });
                }
            }, 500),

            selected: function (index) {
                this.query = this.items[index]['name'];
                this.$emit('input', this.items[index]['id']);
                this.items = [];
            },

        },

    }
</script>
<template>
    <div>
        <input type="hidden" :value="value">
        <input type="text" class="form-control" :value="query" @input="onInput($event.target.value)"
               :placeholder="field.placeholder">
        <table class="table table-hover table-bordered" v-if="items.length">
            <tbody>
            <tr v-for="(item, index) in items">
                <!--  <td v-for="field in fields">{{  }}</td> -->
                <td @click="selected(index)">{{ item.name }}</td>
            </tr>
            </tbody>
        </table>
        <div v-else-if="loading">Loading..</div>
    </div>
</template>