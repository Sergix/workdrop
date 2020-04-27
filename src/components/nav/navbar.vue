<template>
  <nav class="w-full flex flex-row py-2 px-6 mt-4 lg:py-8 items-center z-10">
    <div class="flex flex-row flex-grow lg:flex-grow-0">
      <nuxt-link to="/"
        ><img
          class="w-40 max-w-40"
          src="@/assets/logo/workdrop-black-logo.svg"
          alt="workdrop"
      /></nuxt-link>
      <div class="hidden lg:flex flex-row ml-24 mt-1 font-medium navlist">
        <nuxt-link to="/">HOME</nuxt-link>
        <nuxt-link to="/request">REQUEST</nuxt-link>
        <nuxt-link to="/about">ABOUT</nuxt-link>
        <nuxt-link to="/help">HELP</nuxt-link>
      </div>
    </div>
    <Button type="small" class="lg:hidden z-10" @click="toggleMobileMenu">
      {{ mobileMenuActive ? 'CLOSE' : '' }} MENU
    </Button>
    <slide-x-right-transition :duration="500" :delay="50">
      <NavMenu v-show="mobileMenuActive" @close="closeMenu" />
    </slide-x-right-transition>
  </nav>
</template>

<script>
import { SlideXRightTransition } from 'vue2-transitions'
import Button from '@/components/base/button'
import NavMenu from '@/components/nav/navmenu'

export default {
  name: 'Navbar',
  components: {
    Button,
    NavMenu,
    SlideXRightTransition,
  },
  data() {
    return {
      mobileMenuActive: false,
    }
  },
  watch: {
    $route: 'closeMenu',
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuActive = !this.mobileMenuActive
      this.toggleBodyOverflow()
    },
    closeMenu() {
      this.mobileMenuActive = false
      this.toggleBodyOverflow()
    },
    toggleBodyOverflow() {
      const html = document.documentElement
      const className = 'overflow-y-hidden'
      if (this.mobileMenuActive) {
        window.scrollTo(0, 0)
        html.classList.add(className)
      } else {
        html.classList.remove(className)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.navlist > a
  @apply mx-8
  @apply text-action
</style>
