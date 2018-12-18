<template>
  <div v-show="message && message.length > 0">
    <article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
      </div>
      <div class="message-body">
        {{ message }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ErrorMessage extends Vue {
  @Prop() private message!: string
}
</script>
