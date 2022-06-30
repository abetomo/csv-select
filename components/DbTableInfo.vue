<script lang="ts" setup>
interface Props {
  dbColumnNames: string[]
  csvColumnNames: string[]
}
const props = defineProps<Props>()
</script>

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
