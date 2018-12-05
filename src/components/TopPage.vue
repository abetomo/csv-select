<template>
  <div>
    <div
      class="drop-area"
      @dragleave.prevent
      @dragover.prevent
      @drop.prevent="onDrop">
      <p>Drag and drop file</p>
    </div>

    <db-table-info :column-names="baseColumnNames"></db-table-info>

    <div v-show="this.baseColumnNames.length > 0">
      <textarea v-model="sql" class="textarea is-info" placeholder="select * from hoge"></textarea>
      <button class="button is-fullwidth is-info" @click="runQuery">Run Query</button>
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

@Component({
  components: {
    ResultTable,
    DbTableInfo
  }
})
export default class TopPage extends Vue {
  result: string[] = [];
  columnNames: string[] = [];

  baseColumnNames: string[] = [];
  db: any = new Database();
  sql: string = '';

  createTable (values) {
    this.columnNames = values.map((_, i) => {
      return `c${i + 1}`;
    });
    this.baseColumnNames = this.columnNames
    const columnsString = this.columnNames.map((name) => {
      return `${name} char`;
    }).join(',');
    this.db.run(`drop table if exists hoge; create table hoge (${columnsString});`);
  }

  onDrop (event) {
    this.columnNames = [];
    this.result = [];

    const files = event.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split('\n').map((line) => {
        return line.split(',');
      });
      this.createTable(rows[0]);
      const columnLength = rows[0].length;
      rows.forEach((row) => {
        if (row.length !== columnLength) return;

        this.result.push(row);
        const sql = `insert into hoge values(${
          row.map(v => `"${v}"`).join(',')
        })`;
        this.db.run(sql);
      })
      this.loading = false
    };
    reader.readAsText(files[0]);
  }

  runQuery () {
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

<style lang="scss" scoped>
.drop-area {
  display: block;
  border: 2px dashed #bbb;
  border-radius: 5px;
  color: #bbb;
  padding: 25px;
  text-align: center;
  margin: 10px auto 5px;
  font-size: 18px;
  font-weight: bold;
  -khtml-user-drag: element;
  margin: 5% auto;
  width: 80%;
}
</style>
