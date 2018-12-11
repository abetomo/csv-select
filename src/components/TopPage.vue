<template>
  <div>
    <drag-and-drop @set=setCsvData></drag-and-drop>

    <db-table-info
      :db-column-names="dbColumnNames"
      :csv-column-names="csvColumnNames">
    </db-table-info>

    <div v-show="dbColumnNames.length > 0">
      <textarea v-model="sql" class="textarea is-info" placeholder="select * from hoge"></textarea>
      <button class="button is-fullwidth is-info" @click="runSelectQuery">Run Query</button>
    </div>
    <error-message :message=errorMessage></error-message>

    <result-table :column-names="columnNames" :result="result"></result-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from "vue-property-decorator";
import { Database } from "sql.js"
import ResultTable from "~/components/ResultTable"
import DbTableInfo from "~/components/DbTableInfo"
import DragAndDrop from "~/components/DragAndDrop"
import ErrorMessage from "~/components/ErrorMessage"

@Component({
  components: {
    ResultTable,
    DbTableInfo,
    DragAndDrop,
    ErrorMessage
  }
})
export default class TopPage extends Vue {
  result: string[][] = [];
  columnNames: string[] = [];

  dbColumnNames: string[] = [];
  csvColumnNames: string[] = [];
  db: any = new Database();
  sql: string = '';
  errorMessage: string = ''

  createTable (columnNames: string[]) {
    const columnsString = columnNames.map((name) => {
      return `${name} char`;
    }).join(',');
    this.db.run(`drop table if exists hoge; create table hoge (${columnsString});`);
  }

  setCsvData (csvData: string[][]) {
    this.csvColumnNames = csvData.shift()
    this.dbColumnNames = this.csvColumnNames.map((_, i) => {
      return `c${i + 1}`
    })
    this.createTable(this.dbColumnNames)
    this.result = csvData

    const query = `insert into hoge values(${this.dbColumnNames.map(_ => '?')});`
    csvData.map((row) => {
      this.db.run(query, row)
    })
    this.columnNames = this.dbColumnNames
  }

  runSelectQuery () {
    try {
      this.errorMessage = null
      const result = this.db.exec(this.sql)[0];
      this.columnNames = result.columns;
      this.result = result.values;
    } catch (e) {
      this.errorMessage = e.message
    }
  }
}
</script>
