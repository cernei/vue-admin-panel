<script>
    export default {
        props: ['value', 'field', 'master'],

        computed: {
            selected: {
                get: function () {
                    return this.value;
                },
                set: function () {
                    return this.value;
                },
            },

            list: function () {
                if (this.field.dependsOn && this.master) {

                    return this.$store.getters[this.field.source](this.master) || [];

                } else {
                    return this.$store.state.sources[this.field.source];
                }

            },
            key: function () {
                return this.field.pluck ? this.field.pluck[0] : 'id'
            },
            val: function () {
                return this.field.pluck ? this.field.pluck[1] : 'name'
            },
        },
        methods: {
            updateValue: function (value) {
                this.$emit('input', value);
            }
        },


    }
</script>
<template>
    <div v-if="field">
        <select class="form-control" v-model="selected" @change="updateValue($event.target.value)">
            <option disabled :value="null">Choose one of the variants</option>
            <option v-for="(option, index) in list" :value="option[key]">
                {{ option[val] }}
            </option>
        </select>
    </div>
</template>

