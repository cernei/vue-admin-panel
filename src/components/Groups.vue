<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        created() {
            Object.assign(this, {
                title: 'Groups',
                description: 'groups description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                        {name: 'name', label: 'Name'},
                    ]
                },
                edit_view: {
                    fields: [
                        {name: 'name', label: 'name', type: 'text'},
                    ],
                },
            });
        }
    }
</script>