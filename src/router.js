import { createRouter, createWebHistory } from 'vue-router'

// import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
// import CoachRegisteration from './pages/coaches/CoachRegisteration.vue'
// import ContactCoach from './pages/requests/ContactCoach.vue'
// import RequestReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const CoachDetail = import('./pages/coaches/CoachDetail.vue')
const CoachRegisteration = import('./pages/coaches/CoachRegisteration.vue')
const ContactCoach = import('./pages/requests/ContactCoach.vue')
const RequestReceived = import('./pages/requests/RequestsReceived.vue')
const UserAuth = import('./pages/auth/UserAuth.vue')




const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches'},
    { path: '/Find-a-Coach-Project', redirect: '/coaches'},
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