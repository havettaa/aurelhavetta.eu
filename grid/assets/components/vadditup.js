/* <template>
  <div><slot name="prefix" /> {{ displayTime }}</div>
</template>

<script setup> */
import {
  h,
  ref,
  reactive,
  resolveComponent,
  computed,
  defineProps,
  defineEmits,
} from "vue";


export default {
  setup(props, { attrs, emit, expose, slots }) {
    const state = ref({
      count: 0
    })

    const additup = () => {
      state.value.count++
    }

    return {
      additup,
      state,
    }
  },
  mounted() {
    console.log(`additup mounted`)
  },
  template: `
    <button @click="additup()" class="bg-yellow-400 rounded-full p-2 text-xl">
      additup {{ state.count }}
    </button>
  `
}

// export default {
//   setup(props, { slots, attrs, emit }) {
//     const state = reactive({
//       count: 0
//     })

//     function additup() {
//       state.count++
//     }

//     // return the render function
//     return () =>
//       h(
//         'div',
//         {
//           onClick: additup
//         },
//         state.count
//       )
//   }
// }