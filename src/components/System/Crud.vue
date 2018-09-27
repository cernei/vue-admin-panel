<script>
    import {mapGetters} from 'vuex';
    import {http} from '@/http-common';
    import BeforeCrud from '@/components/System/BeforeCrud';

    export default {
        mixins: [BeforeCrud],
        components: {
            'field-scheme-template': {props: ['fields'], template: require('@/views/FieldSchemeDefault.html')}
        },
        data: () => ({
            id: '',
            data: '',
            item: '',
            items: '',
            action: '',
            route: '',

            debug: false
        }),
        computed: {
            ...mapGetters(['getSourceValue'])
        },
        methods: {
            index() {
                http.get(this.routeUrl).then(response => {
                    this.items = response.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            create() {
                this.item = {};
                var that = this;
                this.edit_view.fields.forEach(function (field, i, arr) {
                    if (field.type == 'inline-crud') {
                        that.item[field.name] = [];
                    }
                });

            },
            edit() {
                http.get(this.routeUrl + '/' + this.$route.params.id).then(response => {
                    this.item = response.data;
                }).catch(e => {
                    console.log(e);
                });
            },

            store() {

                http.post(this.routeUrl, this.item).then(response => {
                    this.$store.commit('flush', {source: this.route});
                    this.$router.push({name: this.route + '.index'});
                }).catch(e => {
                    console.log(e);
                });
            },

            update() {

                http.put(this.routeUrl + '/' + this.$route.params.id, this.item).then(response => {
                    this.$store.commit('flush', {source: this.route});
                    this.$router.push({name: this.route + '.index'});
                }).catch(e => {
                    console.log(e);
                });
            },

            remove(index, id) {

                http.delete(this.routeUrl + '/' + id).then(response => {
                    this.$store.commit('flush', {source: this.route});
                    this.items.splice(index, 1);
                }).catch(e => {
                    console.log(e);
                });
            },
        },

        template: require('@/views/CRUD.html')

    }
</script>