<script>
    import Crud from '@/components/System/Crud'

    export default {
        mixins: [Crud],
        created() {
            Object.assign(this, {
                title: 'Options',
                description: 'options description',
                index_view: {
                    fields: [
                        {name: 'id', label: 'ID'},
                        {name: 'name', label: 'Name'},
                        {name: 'type', label: 'Type', source: 'option_types'},
                    ]
                },
                edit_view: {
                    fields: [
                        {name: 'name', label: 'Name', type: 'text'},
                        {name: 'description', label: 'Description', type: 'text'},
                        {name: 'type', label: 'Type', type: 'select', source: 'option_types'},
                        {name: 'values', label: 'Values', type: 'json-list'},
                    ],
                },
            });
        }

    }
</script>