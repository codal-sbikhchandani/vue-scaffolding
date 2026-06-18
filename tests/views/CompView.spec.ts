import { mount } from '@vue/test-utils'
import CompView from '@/views/CompView.vue'
import { test, expect } from 'vitest'

test('render component correcly', () => {
  const wrapper = mount(CompView)

  expect(wrapper.text()).toContain('Manage Comps')
})
