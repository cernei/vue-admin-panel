<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        created() {
            Object.assign(this, {
                title: 'Users',
                description: 'users description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                        {name: 'name', label: 'Name'},
                    ]
                },
                edit_view: {
                    fields: [
                        {name: 'name', label: 'Name', type: 'text'},
                        {
                            name: 'groups', label: 'Groups', type: 'inline-crud', source: 'groups',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'groups'},
                                ]
                            },
                            edit_view: {
                                fields: []
                            }
                        },
                    ],
                },
            });
        }
    }
</script>