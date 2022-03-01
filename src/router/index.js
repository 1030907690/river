import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/targetBehaviorAnalysis',
    name: 'TargetBehaviorAnalysis',
    component: () => import('../views/TargetBehaviorAnalysis.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: '/dist',
  routes
})

export default router