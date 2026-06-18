import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import TheDashboard from '@/components/TheDashboard.vue'

describe('HomeView.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      global: {
        stubs: {
          TheDashboard: true,
        },
      },
    })
  })

  it('should render TheDashboard component inside the main element', () => {
    const dashboard = wrapper.findComponent(TheDashboard)

    expect(dashboard.exists()).toBe(true)
    expect(wrapper.find('main').findComponent(TheDashboard).exists()).toBe(true)
  })
})
