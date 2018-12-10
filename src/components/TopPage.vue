<template>
  <div>
    <drag-and-drop @set=setCsvData></drag-and-drop>

    <db-table-info :column-names="baseColumnNames"></db-table-info>
    <div v-show="this.baseColumnNames.length > 0">
      <textarea v-model="sql" class="textarea is-info" placeholder="select * from hoge"></textarea>
      <button class="button is-fullwidth is-info" @click="runSelectQuery">Run Query</button>
    </div>
    <error-message :message=errorMessage></error-message>

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <result-table :column-names="columnNames" :result="result"></result-table>
      </div>
    </div>
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

  baseColumnNames: string[] = [];
  db: any = new Database();
  sql: string = '';
  errorMessage: string = ''

  createTable (values: string[]) {
    const columnsString = this.columnNames.map((name) => {
      return `${name} char`;
    }).join(',');
    this.db.run(`drop table if exists hoge; create table hoge (${columnsString});`);
  }

  setCsvData (csvData: string[][]) {
    this.columnNames = csvData[0].map((_, i) => {
      return `c${i + 1}`;
    });
    this.baseColumnNames = this.columnNames
    this.createTable(this.columnNames);
    this.result = csvData

    const sql = csvData.map((row) => {
      return `insert into hoge values(${
        row.map(v => `"${v}"`).join(',')
      });`
    }).join('')
    this.db.run(sql);
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
