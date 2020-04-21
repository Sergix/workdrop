<template>
  <footer class="bg-foreground text-background p-6">
    <div class="max-w-6xl mx-auto">
      <img
        src="@/assets/logo/workdrop-white-logo.svg"
        alt="workdrop"
        class="w-40 max-w-40"
      />
      <ul class="mt-8">
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
        <li><nuxt-link to="/terms">Terms of Use</nuxt-link></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
