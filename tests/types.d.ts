import { DOMWrapper } from '@vue/test-utils'

declare module '@vue/test-utils' {
  export interface VueWrapper {
    findByTestId(testId: string): DOMWrapper<Element>
    findAllByTestId(testId: string): DOMWrapper<Element>[]
  }

  export interface DOMWrapper<NodeType extends Node> {
    findByTestId(testId: string): DOMWrapper<Element>
    findAllByTestId(testId: string): DOMWrapper<Element>[]
  }
}
