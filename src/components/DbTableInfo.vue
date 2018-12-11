<template>
  <div class="has-text-centered" v-show="dbColumnNames.length > 0">
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Column name of CSV</th>
          <td v-for="name in csvColumnNames">{{ name }}</td>
        </tr>
        </tr>
      </thead>
      <tbody>
          <th>Column name of DB</th>
          <td v-for="name in dbColumnNames">{{ name }}</td>
      </tbody>
    </table>
    <p>TableName: <strong>hoge</strong></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class DbTableInfo extends Vue {
  @Prop() private dbColumnNames!: string[]
  @Prop() private csvColumnNames!: string[]
}
</script>

<style lang="scss" scoped>
</style>
