// https://unpkg.com/vue@next
import {
  ref,
  reactive,
  createApp,
  resolveComponent,
  computed,
  defineProps,
  defineEmits,
  defineCustomElement,
} from 'vue'

import { store } from "./components/header/storeHeader.js"
import vheader from "./components/header/vheader.js"
import vadditup from "./components/vadditup.js"

// (async () => {
//   const axios = await import('https://unpkg.com/axios/dist/axios.min.js')
//   console.log(typeof axios)
// })();

// const simpleone = resolveComponent('simpleone');

const app = createApp({
  setup() {
    const storeIncrement = () => store.increment()
    
    return {
      storeIncrement,
      msg: `app created`,
    }
  }
})

app.component('simpleone', {
  template: `<span>simpleone</span>`
})

app.component("vadditup", vadditup )
app.component("vheader", vheader )

app.mount('#app')








const props = defineProps({
  timeZone: {
    type: String,
    default: "America/Los_Angeles",
  },
});

const currentDateTime = ref(new Date());
const displayTime = computed(() =>
  currentDateTime.value.toLocaleString("en-US", {
    timeZone: props.timeZone,
  })
);

setInterval(() => {
  currentDateTime.value = new Date();
  // const emit = defineEmits(["datechange"]);
  // emit("datechange", displayTime);
}, 1000);

document.querySelector('current-time').addEventListener('datechange', recordTime);

function recordTime(event) {
  console.log(event.detail[0].value);
}
