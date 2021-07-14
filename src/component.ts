import { defineComponent, h, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Options } from './types'

export const createComponent = async (options: Options) => {
  const { route, plugins = [] } = options.options
  return defineComponent({
    name: options.name,
    setup(_, { attrs }) {
      const el = ref()

      const render = () =>
        options.render(el.value, { attrs, route, plugins })

      const onUnmount = () => 
        el.value && options.onUnmount?.(el.value)
    
      onMounted(() => render())
      onUpdated(() => render())

      onUnmounted(() => onUnmount())
      onBeforeUnmount(() => onUnmount())

      return () => h('div', { ref: el })
    }
  })
}