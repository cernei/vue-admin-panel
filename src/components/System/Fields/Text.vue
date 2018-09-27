<script>
    export default {
        props: ['value'],
        methods: {
            updateValue: function (value) {
                this.$emit('input', value);
            }
        },

    }
</script>
<template>
    <div>
        <input type="text" class="form-control" :value="value" v-on:input="updateValue($event.target.value)">
    </div>
</template>