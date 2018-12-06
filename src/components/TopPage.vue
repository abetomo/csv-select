<template>
  <div>
    <drag-and-drop @set=setCsvData></drag-and-drop>
    <db-table-info :column-names="baseColumnNames"></db-table-info>
    <div v-show="this.baseColumnNames.length > 0">
      <textarea v-model="sql" class="textarea is-info" placeholder="select * from hoge"></textarea>
      <button class="button is-fullwidth is-info" @click="runSelectQuery">Run Query</button>
    </div>
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
import { Database } from "../sql"
import ResultTable from "~/components/ResultTable"
import DbTableInfo from "~/components/DbTableInfo"
import DragAndDrop from "~/components/DragAndDrop"

@Component({
  components: {
    ResultTable,
    DbTableInfo,
    DragAndDrop
  }
})
export default class TopPage extends Vue {
  result: string[][] = [];
  columnNames: string[] = [];

  baseColumnNames: string[] = [];
  db: any = new Database();
  sql: string = '';

  createTable (values) {
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
      const result = this.db.exec(this.sql)[0];
      this.columnNames = result.columns;
      this.result = result.values;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
