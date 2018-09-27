import Vue from 'vue'
import Router from 'vue-router'

import Users from '@/components/Users'
import Groups from '@/components/Groups'
import Currencies from '@/components/Currencies'
import Categories from '@/components/Categories'
import Stores from '@/components/Stores'
import Products from '@/components/Products'
import Orders from '@/components/Orders'
import Parts from '@/components/Parts'
import Options from '@/components/Options'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/vue-admin-panel',
    routes: [

        {name: 'users.index', path: '/users', component: Users},
        {name: 'users.create', path: '/users/create', component: Users},
        {name: 'users.edit', path: '/users/:id/edit', component: Users},

        {name: 'groups.index', path: '/groups', component: Groups},
        {name: 'groups.create', path: '/groups/create', component: Groups},
        {name: 'groups.edit', path: '/groups/:id/edit', component: Groups},

        {name: 'currencies.index', path: '/currencies', component: Currencies},
        {name: 'currencies.create', path: '/currencies/create', component: Currencies},
        {name: 'currencies.edit', path: '/currencies/:id/edit', component: Currencies},

        {name: 'categories.index', path: '/categories', component: Categories},
        {name: 'categories.create', path: '/categories/create', component: Categories},
        {name: 'categories.edit', path: '/categories/:id/edit', component: Categories},

        {name: 'stores.index', path: '/stores', component: Stores},
        {name: 'stores.create', path: '/stores/create', component: Stores},
        {name: 'stores.edit', path: '/stores/:id/edit', component: Stores},

        {name: 'products.index', path: '/products', component: Products},
        {name: 'products.create', path: '/products/create', component: Products},
        {name: 'products.edit', path: '/products/:id/edit', component: Products},


        {name: 'orders.index', path: '/orders', component: Orders},
        {name: 'orders.create', path: '/orders/create', component: Orders},
        {name: 'orders.edit', path: '/orders/:id/edit', component: Orders},

        {name: 'parts.index', path: '/parts', component: Parts},
        {name: 'parts.create', path: '/parts/create', component: Parts},
        {name: 'parts.edit', path: '/parts/:id/edit', component: Parts},

        {name: 'options.index', path: '/options', component: Options},
        {name: 'options.create', path: '/options/create', component: Options},
        {name: 'options.edit', path: '/options/:id/edit', component: Options},

    ]
})
