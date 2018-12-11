<template>
  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th v-for="columnName in columnNames">{{ columnName }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rows in result">
        <td v-for="str in rows">{{ str }}</td>
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

<style lang="scss" scoped>
</style>
