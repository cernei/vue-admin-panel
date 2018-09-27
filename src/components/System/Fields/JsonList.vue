<script>
    export default {
        props: ['value'],
        data: function () {
            return {
                items: []
            }
        },
        methods: {
            updateValue: function () {
                this.$emit('input', JSON.stringify(this.items));
            },
            add: function () {
                this.items.push('');
                this.updateValue();
            },
            remove: function (key) {
                this.items.splice(key, 1);
                this.updateValue();
            },
            getJson: function () {
                if (this.value) {
                    try {
                        return JSON.parse(this.value);
                    } catch (e) {
                        return [];
                    }
                } else {
                    return [];
                }
            }
        },
        computed: {
            getItems: function () {
                this.items = this.getJson();
                return this.items;
            }
        },

    }
</script>
<template>
    <div>

        <div class="row">
            <div class="col-md-4">
                <div class="row" v-for="(item, key) in getItems">
                    <div class="col-md-9">
                        <input type="text" class="form-control" v-model="items[key]" @input="updateValue()">
                    </div>
                    <div class="col-md-3">
                        <a class="btn btn-sm btn-danger" @click="remove(key)">X</a>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <a class="btn btn-sm btn-success" @click="add()">Add</a>

            </div>
        </div>


    </div>
</template>