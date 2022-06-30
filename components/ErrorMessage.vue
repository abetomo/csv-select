<script lang="ts" setup>
interface Props {
  message: string
}
const props = defineProps<Props>()
</script>

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
