# vue-admin-panel
Simple ADMIN panel on vue with communication to the backend through a REST API.

### Features

- **Inline editing one-to-many relations** for a specific record
- Config based process of adding new entity
- **Reusable components**
- Customizable view for every entity
- Lazy loading of resources
- **Resolving foreign keys** for tables

#### Configuration
Simplest config for adding new CRUD entity.  

``` js
{
    title: 'Categories',
    description: 'description',
    index_view: {
        fields: [
            {name: 'id', label: 'ID'},
            {name: 'name', label: 'Name'},
        ]
    },
    edit_view: {
        fields: [
            {name: 'name', label: 'Name', type: 'text'},
        ],
    },
}

```
You don't need to copy models or views which handle data every time you need a small difference.
All you need to put it into config.

#### Custom view

Example of a customized view for products.

```$xslt
<div>
    <div class="row">
        <div class="col-md-6">
            <slot name="name"></slot>
            <slot name="category_id"></slot>
            <slot name="price"></slot>
        </div>
        <div class="col-md-6">
            <slot name="parts"></slot>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <slot name="stores"></slot>
        </div>
        <div class="col-md-6">
            <slot name="options"></slot>
        </div>
    </div>
</div>
```

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```
