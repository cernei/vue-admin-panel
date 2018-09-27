<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        components: {'field-scheme-template': {props: ['debug'], template: require('@/views/products.html')}},

        created() {
            Object.assign(this, {
                title: 'Products',
                description: 'products description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                        {name: 'name', label: 'Name'},
                        {name: 'category_id', label: 'Category', source: 'categories'},
                    ]
                },
                edit_view: {
                    fields: [
                        {name: 'name', label: 'Name', type: 'text'},
                        {name: 'category_id', label: 'Category', type: 'select', source: 'categories'},
                        {
                            name: 'parts', label: 'Parts', type: 'inline-crud', source: 'parts',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'parts'},
                                ]
                            },
                            edit_view: {
                                fields: []
                            }
                        },
                        {
                            name: 'stores', label: 'Stores', type: 'inline-crud', source: 'stores',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'stores'},
                                    {name: 'price', label: 'Price'},
                                    {name: 'is_active', label: 'Status', source: 'active_or_disabled'},
                                ]
                            },
                            edit_view: {
                                fields: [
                                    {name: 'price', label: 'Price', type: 'text'},
                                    {name: 'is_active', label: 'Status', type: 'select', source: 'active_or_disabled'},
                                ]
                            }
                        },
                        {
                            name: 'options', label: 'Options', type: 'inline-crud', source: 'options',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'options'},
                                    {
                                        name: 'value',
                                        label: 'Value',
                                        type: 'select',
                                        source: 'option_values',
                                        dependsOn: 'id'
                                    }
                                ]
                            },
                            edit_view: {
                                fields: [
                                    {
                                        name: 'value',
                                        label: 'Value',
                                        type: 'select',
                                        source: 'option_values',
                                        dependsOn: 'id'
                                    }
                                ]
                            },
                        },
                    ],
                },
            });
        }

    }
</script>