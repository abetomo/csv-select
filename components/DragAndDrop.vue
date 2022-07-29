<script lang="ts" setup>
import { parse } from 'csv-parse/lib/sync'

interface Emits {
  (e: 'set', value: string[][]): void;
}
const emit = defineEmits<Emits>()

const state = reactive<{
  loading: boolean
}>({
  loading: false,
})

const { root } = useNuxtApp()
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
        root.$buefy.toast.open({
          duration: 5000,
          message: e,
          position: 'is-bottom',
          type: 'is-danger'
        })
        state.loading = false
        return
      }
      const columnLength = rows[0].length
      emit(
        'set',
        rows.filter((row: string[]) => row.length === columnLength)
      )
      state.loading = false
    }
    reader.readAsText(files[0])
  }, 200)
}

const { loading } = toRefs(state)
</script>

<template>
  <div
    class="drop-area"
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <p>Drag and drop file</p>
    <div class="modal" :class="{ 'is-active': loading }">
      <div class="modal-background"></div>
      <div class="modal-content">Loading...</div>
    </div>
  </div>
</template>

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
