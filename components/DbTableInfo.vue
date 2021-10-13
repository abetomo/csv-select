<template>
  <div v-show="props.dbColumnNames.length > 0" class="has-text-centered">
    <div class="scroll">
      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Column name of CSV</th>
            <td v-for="(name, i) in props.csvColumnNames" :key="i">
              {{ name }}
            </td>
          </tr>
        </thead>
        <tbody>
          <th>Column name of DB</th>
          <td v-for="(name, i) in props.dbColumnNames" :key="i">{{ name }}</td>
        </tbody>
      </table>
    </div>
    <p>TableName: <strong>hoge</strong></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dbColumnNames: {
      type: Array,
      required: true,
    },

    csvColumnNames: {
      type: Array,
      required: true,
    },
  },

  setup(props: { dbColumnNames: string[]; csvColumnNames: string[] }) {
    return { props }
  },
})
</script>
