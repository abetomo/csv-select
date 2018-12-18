<template>
  <div class="scroll">
    <table class="table is-hoverable is-fullwidth scroll">
      <thead>
        <tr>
          <th v-for="(columnName, i) in columnNames" :key="i">{{ columnName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, i) in result" :key="i">
          <td v-for="(str, i) in rows" :key="i">{{ str }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ResultTable extends Vue {
  @Prop() private columnNames!: string[]
  @Prop() private result!: string[]
}
</script>
