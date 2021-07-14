import type { App, Plugin } from 'vue'

export function getPlugins(plugins: string[]) {
  return Promise.all(plugins.map(async plugin => {
    const component = await import(/* @vite-ignore */ plugin)
    return component.default as Plugin
  })) 
}

export function installPlugin(app: App, plugins: Plugin[]) {
  plugins.forEach(plugin => {
    app.use(plugin)
  })
  return app
}