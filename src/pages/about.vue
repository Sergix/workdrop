<template>
  <main class="px-8 max-w-2xl">
    <h1 class="text-4xl leading-tight font-semibold">
      The COVID-19 global crisis forced schools to switch to online education
      platforms.
    </h1>
    <p class="mt-16">
      For teachers across the world, it was
      <span class="underlined">time-consuming</span> and often
      <span class="underlined">frustrating</span> to transition their students
      to an <span class="underlined">entirely new platform.</span>
    </p>
    <img
      src="@/assets/svg/illustration-covid19.svg"
      alt="COVID-19"
      class="mx-auto mt-16"
    />
    <p class="mt-16 text-right">
      Class video calls, virtually-administered tests, homework submission...
    </p>
    <img
      src="@/assets/svg/illustration-books.svg"
      alt="Books"
      class="mx-auto max-w-xs mt-8 p-12"
    />
    <p class="mt-8">
      Some thought it would be
      <span class="font-semibold text-error-accessible">impossible</span> to do
      school this way.
    </p>
    <section class="px-8 mt-16 lg:mt-32 lg:max-w-md mx-auto">
      <p>
        <span class="font-semibold">workdrop</span> solves one of these
        problems:
        <span class="underlined">assignment collection.</span>
      </p>
      <img
        src="@/assets/svg/illustration-files.svg"
        alt="Files"
        class="mt-8 mx-auto"
      />
      <p class="mt-10">
        With an <span class="text-action font-semibold">intuitive</span>, simple
        interface, workdrop enables you to request
        <span class="font-semibold">any type of file</span> from your students
        via email.
      </p>
      <p class="mt-10">Best of all? No account necessary.</p>
    </section>
    <section>
      <h2 class="text-4xl leading-tight font-semibold mt-16 md:mt-32">
        So what are you waiting for? Discover a new format of collaboration.
      </h2>
      <nuxt-link to="/request">
        <Button class="mt-4 mb-16">
          REQUEST AN ASSIGNMENT
        </Button>
      </nuxt-link>
    </section>
  </main>
</template>

<script>
import Button from '@/components/base/button'

export default {
  name: 'AboutPage',
  components: {
    Button,
  },
  head() {
    return {
      title: 'About / workdrop',
    }
  },
}
</script>

<style lang="sass" scoped>
p
  @apply text-2xl
  @apply font-medium
  @apply leading-tight
</style>
