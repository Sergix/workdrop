<template>
  <main class="px-8 max-w-2xl">
    <h1 class="text-4xl mb-2 leading-none font-semibold">
      Your assignment has been submitted!
    </h1>
    <p class="text-sm italic mb-4">You can now close this page.</p>
    <img
      src="@/assets/svg/illustration-books.svg"
      alt="Books"
      class="w-1/3 ml-auto"
    />
  </main>
</template>

<script>
export default {
  name: 'SuccessPage',
  head() {
    return {
      title: 'Success / workdrop',
    }
  },
}
</script>
