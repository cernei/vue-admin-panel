<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        created() {
            Object.assign(this, {
                title: 'Orders',
                description: 'description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                    ]
                },
                edit_view: {
                    fields: [
                        {
                            name: 'products', label: 'Products', type: 'inline-crud', source: 'products',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'products'},
                                    {name: 'qty', label: 'Qty', type: 'text'},
                                ]
                            },
                            edit_view: {
                                fields: [
                                    {name: 'qty', label: 'Qty', type: 'text'},
                                ]
                            }
                        },
                    ],
                },

            });
        },

    }
</script>