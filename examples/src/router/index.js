import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/base',
    children: [
      {
        path: 'base',
        name: 'BaseDemo',
        component: () => import('@/views/base/index.vue'),
        meta: { title: '基础使用', icon: 'menu' }
      },
      {
        path: 'group',
        name: 'GroupDemo',
        component: () => import('@/views/group/index.vue'),
        meta: { title: '分组表头', icon: 'menu' }
      },
      {
        path: 'events',
        name: 'EventsDemo',
        component: () => import('@/views/events/index.vue'),
        meta: { title: '事件', icon: 'menu' }
      },
      {
        path: 'multiple',
        name: 'MultipleDemo',
        component: () => import('@/views/multiple/index.vue'),
        meta: { title: '多个表格', icon: 'menu' }
      }
    ]
  },
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
