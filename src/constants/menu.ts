import Index from '../components/m-bottom-menu/index.vue'
import Hero from '@/pages/hero.vue'
import Favorite from '@/pages/favorite.vue'

import type { RouteRecordRaw } from 'vue-router'

export const MENU: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      title: 'Marvel Heroes',
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorite,
    meta: {
      title: 'Favorites',
    },
  },
  {
    path: '/hero/:id',
    name: 'hero',
    component: Hero,
    meta: {
      title: 'Hero',
    },
  },
]
