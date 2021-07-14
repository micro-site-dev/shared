import type { Plugin } from 'vue'

import type { Route } from './types'
import { createComponent } from './component'

export interface CreateRouteOptions {
  route: Route | Array<Route>
  plugins?: Plugin[]
  globalPath?: string
}

export const createRoute = (options: CreateRouteOptions) => {
  const { route, plugins = [], globalPath } = options, routes = route as Route
  const value = {
    path: routes.path,
    component: async () => {
      const component = await import(/* @vite-ignore */routes.component)
      return createComponent({ ...component.default, options: { route, plugins } } ?? globalThis[globalPath])
    }
  }
  return value as import('vue-router').RouteRecordRaw
}

export const createRoutes = (options: CreateRouteOptions) => {
  const routes = Array.isArray(options.route) ? options.route: [ options.route ]
  return routes.map(route => {
    return createRoute({ route, plugins: options.plugins })
  })
}