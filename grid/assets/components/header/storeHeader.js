import { reactive } from 'vue'

export const store = reactive({
  count: 3,
  increment() {
    this.count++
  }
})
