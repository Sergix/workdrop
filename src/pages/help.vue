<template>
  <main class="px-8 max-w-2xl">
    <h1 class="text-4xl leading-tight font-semibold">Need some help?</h1>
    <p>
      Find what you need in our sections below. Still need assistance? Contact
      us at
      <a href="mailto:help@workdrop.app" class="text-action">
        help@workdrop.app
      </a>
    </p>
    <section>
      <h3>What is workdrop?</h3>
      <p>
        Workdrop is an assignment requesting app for teachers and educators.
      </p>
    </section>
    <section>
      <h3>How are assignments sent in?</h3>
      <p>
        When you create a new assignment request, you provide your students’
        emails. An email is sent out to each student you entered, and this email
        contains a link to this website on a page they can submit their
        assignment.
      </p>
    </section>
    <section>
      <h3>What types of assignments can my students send in?</h3>
      <p>
        Any file type is acceptable, from Microsoft Word documents, to videos,
        to simple text files. Maximum file size is 250 megabytes.
      </p>
    </section>
    <section>
      <h3>Is workdrop free?</h3>
      <p>
        Yes! Workdrop is 100% free, and does not require any payment
        information.
      </p>
    </section>
    <section>
      <h3>Do you give out my data?</h3>
      <p>
        No. We respect your privacy, and will never sell, give out, or allow
        access to your data to anyone outside our company.
        <nuxt-link to="/privacy" class="text-action">
          View our privacy policy for more information.
        </nuxt-link>
      </p>
    </section>
    <section>
      <h3>How do I download my students’ assignments?</h3>
      <p>
        When you send out an assignment request, an email is sent to you
        containing a unique link for you to be able to access a special page on
        our website and download your students’ assignments. None of your
        students have access to view any other student’s submission.
      </p>
    </section>
    <h2 class="text-4xl leading-none font-semibold mt-12 mb-4">
      Still have questions?
    </h2>
    <p class="mt-8">
      We’d love to answer them. Email us at
      <a href="mailto:help@workdrop.app" class="text-action">
        help@workdrop.app
      </a>
      with your question, and we’ll get back to you as soon as possible.
    </p>
  </main>
</template>

<style lang="sass" scoped>
p
  @apply mt-2

section
  @apply mt-10

h3
  @apply font-medium
  @apply text-2xl
  @apply leading-tight
</style>
