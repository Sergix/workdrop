<template>
  <nav
    class="w-full flex flex-row py-2 px-6 mt-4 md:py-8 md:px-0 items-center z-10"
  >
    <div class="flex flex-row flex-grow md:flex-grow-0">
      <img
        class="w-40 max-w-40"
        src="@/assets/logo/workdrop-black-logo.svg"
        alt="workdrop"
      />
      <div class="hidden md:flex flex-row navlist ml-24 mt-1 font-medium">
        <nuxt-link to="/" class="active">HOME</nuxt-link>
        <nuxt-link to="/request">REQUEST</nuxt-link>
        <nuxt-link to="/about">ABOUT</nuxt-link>
        <nuxt-link to="/help">HELP</nuxt-link>
      </div>
    </div>
    <Button type="small" class="md:hidden z-10" @click="toggleMobileMenu">
      {{ mobileMenuActive ? 'CLOSE' : '' }} MENU
    </Button>
    <slide-x-right-transition>
      <NavMenu v-show="mobileMenuActive" />
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
    },
    closeMenu() {
      this.mobileMenuActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.navlist > a {
  @apply mx-8;
  @apply text-action;

  &.active {
    @apply border-warning;
    @apply border-b-2;
  }
}
</style>
