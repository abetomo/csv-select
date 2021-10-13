<template>
  <div class="scroll">
    <table class="table is-hoverable is-fullwidth scroll">
      <thead>
        <tr>
          <th v-for="(columnName, i) in props.columnNames" :key="i">
            {{ columnName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, i) in props.result" :key="i">
          <td v-for="(str, j) in rows" :key="j">{{ str }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    columnNames: {
      type: Array,
      required: true,
    },

    result: {
      type: Array,
      required: true,
    },
  },

  setup(props: { columnNames: string[]; result: string[][] }) {
    return { props }
  },
})
</script>
