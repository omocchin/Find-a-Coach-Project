import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from './pages/coaches/CoachesList.vue'
import NotFound from './pages/NotFound.vue'
import store from './store/index.js'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachRegisteration from './pages/coaches/CoachRegisteration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestReceived from './pages/requests/RequestsReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches'},
    { path: '/coaches', component: CoachesList },
    { path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
      { path: 'contact', component: ContactCoach } // /coaches/c1/contract
    ]},
    { path: '/register', component: CoachRegisteration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true }},
    { path: '/:notFound(.*)', component: NotFound },
  ]
})

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('coached')
  } else {
    next()
  }
})

export default router