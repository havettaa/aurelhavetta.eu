import { store } from "./storeHeader.js"

export default {
  setup() {
    return {
      store
    }
  },
  template: `
    {{ store.count }}
  `
}
