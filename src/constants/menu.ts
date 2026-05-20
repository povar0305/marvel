import Hero from '@/pages/hero.vue'
import Index from '@/pages/index.vue'
import Favorite from '@/pages/favorite.vue'

import type { RouteRecordRaw } from 'vue-router'
import { Search, Star } from '@element-plus/icons-vue'

export const MENU: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      title: 'Search',
      is_in_bottom_menu: true,
      icon: Search,
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorite,
    meta: {
      title: 'Favorites',
      is_in_bottom_menu: true,
      icon: Star,
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
