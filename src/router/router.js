import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home.vue'
import Seller from './Seller.vue'
import Sellers from '../components/Sellers.vue'
import Goods from '../components/Goods.vue'
import Ratings from '../components/Ratings.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component:Home
        },
        {
            path: '/home',
            name: 'home',
            component:Home
        },
        {
            path: '/seller/:id',
            name: 'seller',
            component: Seller,
            children:[
                {
                    path:'Sellers',
                    name: 'sellers',
                    component: Sellers
                },
                {
                    path:'Goods',
                    name: 'goods',
                    component: Goods
                },
                {
                    path:'Ratings',
                    name: 'ratings',
                    component: Ratings
                },
            ]
        }
    ]
})

