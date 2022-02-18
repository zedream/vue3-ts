import { ref, defineComponent, h } from 'vue'
import './index.scss'

export default defineComponent({
  setup () {
    const text = ref('按钮')
    return () => (
			<button class="th-button">{ text.value }</button>
    )
  }
})
