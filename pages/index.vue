<template>
  <section class="section">
    <drag-and-drop @set="setCsvData" />

    <db-table-info
      :db-column-names="state.dbColumnNames"
      :csv-column-names="state.csvColumnNames"
    >
    </db-table-info>

    <div v-show="state.dbColumnNames.length > 0">
      <textarea
        v-model="state.sql"
        class="textarea is-info"
      ></textarea>
      <button class="button is-fullwidth is-info" @click="runSelectQuery">
        Run Query
      </button>
    </div>
    <error-message :message="state.errorMessage"></error-message>

    <result-table :column-names="state.columnNames" :result="state.result" />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@nuxtjs/composition-api'
import initSqlJs from 'sql.js'
import DragAndDrop from '@/components/DragAndDrop.vue'
import DbTableInfo from '@/components/DbTableInfo.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ResultTable from '@/components/ResultTable.vue'

const createTable = (db: any, columnNames: string[]) => {
  const columnsString = columnNames
    .map((name) => {
      return `${name} char`
    })
    .join(',')
  db.run(`drop table if exists hoge; create table hoge (${columnsString});`)
}

export default defineComponent({
  components: {
    DragAndDrop,
    DbTableInfo,
    ErrorMessage,
    ResultTable,
  },

  setup() {
    const state = reactive<{
      csvColumnNames: string[]
      dbColumnNames: string[]
      errorMessage: string
      sql: string
      result: string[][]
      columnNames: string[]
    }>({
      csvColumnNames: [],
      dbColumnNames: [],
      errorMessage: '',
      sql: '',
      result: [],
      columnNames: [],
    })

    let db: any = null
    onMounted(async () => {
      const SQL = await initSqlJs()
      db = new SQL.Database()
    })

    const runSelectQuery = () => {
      try {
        state.errorMessage = ''
        const result = db.exec(state.sql)[0]
        state.columnNames = result.columns
        state.result = result.values
      } catch (e: unknown) {
        if (e instanceof Error) {
          state.errorMessage = e.message
        }
      }
    }

    const setCsvData = (csvData: string[][]) => {
      state.csvColumnNames = csvData.shift() as string[]
      state.dbColumnNames = state.csvColumnNames.map((_, i) => {
        return `c${i + 1}`
      })
      createTable(db, state.dbColumnNames)
      state.result = csvData

      const query = `insert into hoge values(${state.dbColumnNames.map(
        (_) => '?'
      )});`
      for (const row of csvData) {
        db.run(query, row)
      }
      state.columnNames = state.dbColumnNames
      state.sql = "select * from hoge"
    }

    return {
      state,
      setCsvData,
      runSelectQuery,
    }
  },
})
</script>
