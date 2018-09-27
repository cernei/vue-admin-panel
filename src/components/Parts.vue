<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        created() {
            Object.assign(this, {
                title: 'Parts',
                description: 'parts description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                        {name: 'name', label: 'Name'},
                        {name: 'options_summary', label: 'Summary'},
                    ]
                },
                edit_view: {
                    fields: [
                        {name: 'name', label: 'Name', type: 'text'},
                        {
                            name: 'options', label: 'Options', type: 'inline-crud', source: 'options',
                            index_view: {
                                fields: [
                                    {name: 'id', label: 'Name', type: 'select', source: 'options'},

                                ]
                            },
                            edit_view: {
                                fields: [
                                    {name: 'value', label: 'Value', type: 'text'},
                                ]
                            },
                        },

                    ],
                },
            });
        }


    }
</script>