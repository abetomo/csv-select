<template>
  <div
    class="drop-area"
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onDrop">
    <p>Drag and drop file</p>
    <div class="modal" :class="{'is-active': loading }">
      <div class="modal-background"></div>
      <div class="modal-content">
        Loading...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import parse from "csv-parse/lib/sync"

@Component
export default class DragAndDrop extends Vue {
  loading: boolean = false

  onDrop (event) {
    this.loading = true
    const files = event.dataTransfer.files
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const rows = parse(e.target.result, { skip_empty_lines: true })
        const columnLength = rows[0].length
        this.$emit('set', rows.filter(row => row.length === columnLength))
        this.loading = false
      };
      reader.readAsText(files[0])
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
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
  margin: 5% auto;
  width: 80%;
}
</style>

