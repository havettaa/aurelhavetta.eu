import { shallowRef, triggerRef, computed } from 'vue'

export const ngref = shallowRef()

export function ngsignal(initialValue) {
  ngref.value = initialValue;
  const r = ngref;
  const s = () => r.value
  s.set = value => { r.value = value }
  s.update = updater => { r.value = updater(r.value) }
  s.mutate = mutator => { mutator(r.value); triggerRef(r) }
  return s
}

export function ngcomputed(getter) {
  const c = computed(getter)
  return () => c.value
}