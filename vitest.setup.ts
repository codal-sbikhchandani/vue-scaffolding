import { config } from '@vue/test-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTestIdPlugin = (wrapper: any) => {
  function findByTestId(selector: string) {
    return wrapper.find(`[data-testid='${selector}']`)
  }

  function findAllByTestId(selector: string) {
    return wrapper.findAll(`[data-testid='${selector}']`)
  }

  return {
    findByTestId,
    findAllByTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)
config.plugins.DOMWrapper.install(DataTestIdPlugin)
