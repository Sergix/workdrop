<template>
  <form class="flex flex-col px-8" @submit.prevent="$emit('continue')">
    <h2 class="text-3xl mb-2 leading-none">{{ title }}</h2>
    <p class="text-sm italic mb-4">{{ description }}</p>
    <slot />
    <div class="flex flex-row mt-4 w-full">
      <Button v-show="backButton" type="warning" @click="$emit('back')">
        GO BACK
      </Button>
      <Button
        v-show="continueButton"
        type="primary"
        class="ml-auto"
        @click="$emit('continue')"
      >
        CONTINUE
      </Button>
    </div>
  </form>
</template>

<script>
import Button from '@/components/base/button'

export default {
  name: 'Form',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Form',
    },
    description: {
      type: String,
      required: false,
      default: 'description',
    },
    backButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    continueButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  min-width: 23em;
}
</style>
