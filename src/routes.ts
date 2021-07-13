import type { Route } from './types'

import { createComponent } from './component'

export const createRoute = (route: Route, globalPath?: string) => {
  const value = {
    path: route.path,
    component: async () => {
      const component = await import(/* @vite-ignore */route.component)
      return createComponent({ ...component.default, route } ?? globalThis[globalPath])
    }
  }
  return value as import('vue-router').RouteRecordRaw
}

export const createRoutes = (routes: Array<Route>) => {
  return routes.map(route => createRoute(route))
}