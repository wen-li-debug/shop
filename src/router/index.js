import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/login/')
const Demo = () => import('@/views/demo')
const Home = () => import('@/views/home/')
const Welcome = () => import('@/views/main/welcome.vue')
const Users = () => import('@/views/main/users.vue')
const Categories = () => import('@/views/main/categories.vue')
const Goods = () => import('@/views/main/goods.vue')
const Orders = () => import('@/views/main/orders.vue')
const Params = () => import('@/views/main/params.vue')
const Reports = () => import('@/views/main/reports.vue')
const Rights = () => import('@/views/main/rights.vue')
const Roles = () => import('@/views/main/roles.vue')

const routes = [
  {
    path: '/demo',
    component: Demo
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/categories',
        name: 'categories',
        component: Categories
      },
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/orders',
        name: 'orders',
        component: Orders
      },
      {
        path: '/params',
        name: 'params',
        component: Params
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
