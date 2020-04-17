<template>
  <button
    type="button"
    class="py-2 px-8 rounded-md text-md tracking-wide shadow-soft"
    :class="{ [action]: action }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    action: {
      default: 'primary',
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
button.primary {
  @apply bg-action;
  @apply text-background;
  @apply font-medium;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  &:active {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.15);
  }
}

button.secondary {
  @apply bg-background;
  @apply text-action;
  @apply border;
  @apply border-action;
  @apply border-2;
  @apply font-semibold;
}
</style>
