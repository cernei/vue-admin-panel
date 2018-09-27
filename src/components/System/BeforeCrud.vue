<script>
    export default {
        watch: {
            '$route': 'setAction'
        },

        methods: {
            setAction() {
                let routeName = this.$route.name.split('.');

                if (!this.routeUrl) this.routeUrl =  routeName[0];
                this.route = routeName[0];
                this.action = routeName[1];
                this[this.action]();
            },
            preloadSources(obj) {
                let that = this;
                obj.forEach(function (field, i, arr) {
                    if (field.source && !that.$store.state.sourceMap[field.source].processed) that.$store.commit('addToBatch', {source: field.source});
                    if (field.fields) that.preloadSources(field.fields);
                });
            }

        },
        mounted() {
            this.setAction();

            this.$store.commit('startBatch');
            this.preloadSources(this.index_view.fields);
            this.preloadSources(this.edit_view.fields);
            this.$store.dispatch('endBatch');

            this.$store.dispatch('loadGlobals');
        },
    }
</script>