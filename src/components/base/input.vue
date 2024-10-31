<template>
  <input
    :value="value"
    :maxlength="maxlength"
    type="text"
    class="bg-background text-foreground rounded rounded-md border border-foreground px-4 py-2"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
input::-moz-selection {
  @apply bg-action;
  @apply text-background;
}
input::selection {
  @apply bg-action;
  @apply text-background;
}
</style>
