<script>
    import {mapGetters} from 'vuex'
    const _ = require('lodash');
    export default {
        props: {
            items: {
                type: Array,
                default: function () {
                    return []
                },
            },
            field: {
                type: Object,
                default: {},
            },
            source: {
                type: String,
                default: '',
            }
        },
        data: () => ({
            action: '',
            item: {},
            modal: false,
            index: 0,

        }),
        computed: {
            primary() {
                return {name: 'id', label: 'Name', type: 'select', source: this.field.source}
            },
            ...mapGetters(['getSourceValue'])
        },
        methods: {
            create() {
                this.index = 0;
                this.item = {};
                this.modal = true;
                this.action = 'create';
            },
            edit(index) {
                this.index = index;
                this.item = _.clone(this.items[index]);
                this.modal = true;
                this.action = 'edit';

            },
            store() {
                this.items.push(this.item);
                this.modal = false;
            },
            update(index) {
                this.items[this.index] = this.item;
                this.modal = false;
            },
            remove(index, id) {
                this.items.splice(index, 1);
            },
        },

    }
</script>
<template>
    <div>

        <p>
            <a type="button" class="btn btn-sm btn-success" @click="create()">Add</a>
        </p>

        <modal v-model="modal" title="Add" :backdrop="false">
            <div>
                <label>{{ field.label }}:</label>
                <field-select v-model="item[primary.name]" :field="primary"></field-select>

                <div v-for="field in this.field.edit_view.fields">
                    <label>{{ field.label }}:</label>
                    <component :is="'field-' + field.type" v-model="item[field.name]" :field="field"
                               :master="item[field.dependsOn]"></component>
                </div>
            </div>
            <div slot="footer">
                <a class="btn btn-sm btn-success" @click="action == 'create' ? store() : update()">Save</a>
            </div>
        </modal>

        <table class="table table-hover table-bordered" v-if="items && items.length">
            <tbody>
            <tr>
                <th v-for="field in field.index_view.fields">{{ field.label }}</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in items">
                <td v-for="field in field.index_view.fields">{{ getSourceValue(field, item) }}</td>
                <td>
                    <button class="btn btn-sm btn-default pull-right" @click="edit(index)">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-default pull-right" @click="remove(index, item.id)">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>