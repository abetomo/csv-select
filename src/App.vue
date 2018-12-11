<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

.scroll{
  overflow: auto;
  white-space: nowrap;
}
.scroll::-webkit-scrollbar{
  height: 5px;
}
.scroll::-webkit-scrollbar-track{
  background: #f1f1f1;
}
.scroll::-webkit-scrollbar-thumb {
  background: #bcbcbc;
}
</style>
