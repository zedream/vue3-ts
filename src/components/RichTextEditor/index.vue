<template>
  <div ref="editorRef" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import E from 'wangeditor'
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const editorRef = ref()
    let editor

    onMounted(() => {
      editor = new E(editorRef.value)

      editor.config.zIndex = 1000
      editor.config.menus = [
        'head',
        'bold', // 字体加粗
        'fontSize', // 字号
        'fontName', // 字体
        'italic',
        'underline', // 下划线
        'strikeThrough', // 删除线
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list', // 列表
        // 'todo',
        'justify', // 对齐
        'quote', // 引用
        'emoticon',
        'image',
        // 'video', // 视频
        'table', // 表格
        // 'code',
        'splitLine',
        'undo', // 撤销
        'redo' // 恢复
      ]

      Object.assign(editor.config, {
        onchange () {
          emit('update:modelValue', editor.txt.html())
        }
      })

      editor.create()

      editor.txt.html(props.modelValue)
    })

    onBeforeUnmount(() => {
      editor.destroy()
    })

    const setHtml = (html) => {
      editor.txt.html(html)
    }

    return {
      editorRef,
      setHtml
    }
  }
})
</script>

<style scoped lang="scss">

</style>
