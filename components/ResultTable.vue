<script lang="ts" setup>
interface Props {
  columnNames: string[]
  result: string[][]
}
const props = defineProps<Props>()
</script>

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
