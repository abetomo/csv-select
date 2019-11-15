<template>
  <div class="has-text-centered" v-show="dbColumnNames.length > 0">
    <div class="scroll">
      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Column name of CSV</th>
            <td v-for="(name, i) in csvColumnNames" :key="i">{{ name }}</td>
          </tr>
        </thead>
        <tbody>
            <th>Column name of DB</th>
            <td v-for="(name, i) in dbColumnNames" :key="i">{{ name }}</td>
        </tbody>
      </table>
    </div>
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
