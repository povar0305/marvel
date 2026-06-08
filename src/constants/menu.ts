import About from '@/pages/about.vue'
import Hero from '@/pages/hero.vue'
import Index from '../pages/index/index.vue'
import Favorite from '@/pages/favorite.vue'

import type { RouteRecordRaw } from 'vue-router'

/**
 * Константа для хранения меню
 */
export const MENU: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      title: 'Search',
      is_in_bottom_menu: true,
      icon: 'iconamoon:search-light',
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorite,
    meta: {
      title: 'Favorites',
      is_in_bottom_menu: true,
      icon: 'material-symbols:kid-star-outline',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'About',
      is_in_bottom_menu: true,
      icon: 'material-symbols:question-mark',
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
