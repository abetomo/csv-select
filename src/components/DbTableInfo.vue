<template>
  <div class="has-text-centered" v-show="columnNames.length > 0">
    <ul>
      <li>TableName: hoge</li>
      <li>Columns: {{ columnNames.join(', ') }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class DbTableInfo extends Vue {
  @Prop() private columnNames!: string[]
}
</script>

<style lang="scss" scoped>
</style>
