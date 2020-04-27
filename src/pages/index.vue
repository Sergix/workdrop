<template>
  <main class="flex flex-col mb-16 max-w-6xl lg:mb-32">
    <div class="flex flex-col mx-8 md:flex-row">
      <div class="hidden lg:block mt-16 leading-tight max-w-xl pr-16">
        <p class="underlined font-bold text-4xl">
          Workdrop is a service designed for educators to request files from
          students for assignments.
        </p>
        <p class="text-lg mt-4 font-medium">
          No account necessary. Completely free.
        </p>
      </div>
      <img
        src="@/assets/svg/illustration-online_education.svg"
        alt="Studying"
        class="w-64 mx-auto lg:mt-12"
      />
    </div>
    <nuxt-link to="/request" class="mx-auto mt-16">
      <Button class="text-lg request-button">
        REQUEST AN ASSIGNMENT
      </Button>
    </nuxt-link>

    <!-- duplicated from above for mobile view -->
    <div class="lg:hidden mx-8 mt-16 font-medium text-2xl leading-tight">
      <p class="underlined">
        Workdrop is a service designed for educators to request files from
        students for assignments.
      </p>
      <p class="text-right mt-12">No account necessary. Completely free.</p>
    </div>
  </main>
</template>

<script>
import Button from '@/components/base/button'

export default {
  name: 'IndexPage',
  components: {
    Button,
  },
  head() {
    return {
      title: 'workdrop',
    }
  },
}
</script>

<style lang="sass" scoped>
.request-button:after
  border: 1px solid black
  @apply m-4
</style>
