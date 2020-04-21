<template>
  <nav
    class="absolute right-0 top-0 w-screen h-screen bg-background text-right px-4 py-4"
  >
    <div class="flex flex-col leading-9 mt-16 mr-2 navlinks">
      <nuxt-link to="/">HOME</nuxt-link>
      <nuxt-link to="/request">REQUEST</nuxt-link>
      <nuxt-link to="/about">ABOUT</nuxt-link>
      <nuxt-link to="/help">HELP</nuxt-link>
    </div>
    <p class="w-1/2 absolute bottom-0 right-0 mb-16 mr-8 font-medium">
      MADE BY SERGIX FOR #TWILIOHACKATHON
    </p>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
}
</script>

<style lang="sass" scoped>
.navlinks > a
  @apply font-bold
  @apply text-6xl
  @apply text-action
  @apply mt-8
  @apply border-b-4
  @apply border-warning
  align-self: flex-end
  -webkit-text-fill-color: white
  -webkit-text-stroke-width: 2px
  -webkit-text-stroke-color: #1c3ffd
</style>
