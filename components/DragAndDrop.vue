<template>
  <div
    class="drop-area"
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <p>Drag and drop file</p>
    <div class="modal" :class="{ 'is-active': state.loading }">
      <div class="modal-background"></div>
      <div class="modal-content">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { parse } from 'csv-parse/lib/sync'

export default defineComponent({
  setup(_, ctx) {
    const state = reactive<{
      loading: boolean
    }>({
      loading: false,
    })

    const onDrop = (event: any) => {
      state.loading = true
      const files = event.dataTransfer.files
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          let rows = []
          try {
            rows = parse(e.target.result, { skip_empty_lines: true })
          } catch (e) {
            ;(ctx.root as any).$buefy.toast.open({
              duration: 5000,
              message: e,
              position: 'is-bottom',
              type: 'is-danger'
            })
            state.loading = false
            return
          }
          const columnLength = rows[0].length
          ctx.emit(
            'set',
            rows.filter((row: string[]) => row.length === columnLength)
          )
          state.loading = false
        }
        reader.readAsText(files[0])
      }, 200)
    }

    return {
      state,
      onDrop,
    }
  },
})
</script>

<style scoped>
.drop-area {
  display: block;
  border: 2px dashed #bbb;
  border-radius: 5px;
  color: #bbb;
  padding: 25px;
  text-align: center;
  margin: 10px auto 5px;
  font-size: 18px;
  font-weight: bold;
  -khtml-user-drag: element;
  width: 80%;
}
</style>
