<template>
  <div v-show="props.message && props.message.length > 0">
    <article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
      </div>
      <div class="message-body">
        {{ props.message }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },

  setup(props: { message: string }) {
    return { props }
  },
})
</script>
