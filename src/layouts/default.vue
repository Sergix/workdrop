<template>
  <div class="flex flex-col min-h-screen min-w-full">
    <Navbar class="max-w-6xl mx-auto" />
    <nuxt class="my-10 mx-auto flex-1" />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/nav/navbar'
import Footer from '@/components/footer'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="sass">
html
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  overflow-x: hidden

body
  overflow-x: hidden

*, *:before, *:after
  box-sizing: border-box
  margin: 0
</style>
