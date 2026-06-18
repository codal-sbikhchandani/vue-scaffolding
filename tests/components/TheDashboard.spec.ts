import { mount } from '@vue/test-utils'
import TheDashboard from '@/components/TheDashboard.vue'
import { test, expect } from 'vitest'

test('render component correcly', () => {
  const wrapper = mount(TheDashboard)

  expect(wrapper.findByTestId('header').text()).toContain('PVA Landing Page')
})
