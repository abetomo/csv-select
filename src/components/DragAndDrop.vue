<template>
  <div
    class="drop-area"
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent="onDrop">
    <p>Drag and drop file</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";

@Component
export default class DragAndDrop extends Vue {
  onDrop (event) {
    const files = event.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split('\n').map((line) => {
        return line.split(',');
      });
      const columnLength = rows[0].length;
      this.$emit('set', rows.filter(row => row.length === columnLength))
    };
    reader.readAsText(files[0]);
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

