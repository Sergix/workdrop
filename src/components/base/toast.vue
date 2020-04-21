<template>
  <aside
    class="flex flex-row pt-5 pb-6 pl-6 pr-4 rounded-lg w-toast invisible z-10 fixed left-0 right-0 mx-auto toast"
    :class="{
      active,
      [backgroundColorClass]: backgroundColorClass,
      [textColorClass]: textColorClass,
    }"
  >
    <div class="mr-4">
      <h3 class="text-2xl">{{ title }}</h3>
      <p class="leading-4 text-sm">
        <slot />
      </p>
    </div>
    <img :src="iconSrc" class="mr-6" />
  </aside>
</template>

<script>
export default {
  name: 'SuccessToast',
  props: {
    title: {
      type: String,
      default: 'Notification',
    },
    backgroundColor: {
      type: String,
      default: 'background',
    },
    textColor: {
      type: String,
      default: 'foreground',
    },
    icon: {
      type: String,
      default: 'info',
    },
  },
  data() {
    return {
      active: false,
    }
  },
  computed: {
    iconSrc() {
      return require(`@/assets/svg/${this.icon}.svg`)
    },
    backgroundColorClass() {
      return `bg-${this.backgroundColor}`
    },
    textColorClass() {
      return `text-${this.textColor}`
    },
  },
  methods: {
    open() {
      this.active = true
      setTimeout(() => (this.active = false), 5000)
    },
  },
}
</script>

<style lang="scss" scoped>
$fadein-height: 1.5rem;
$fadeout-height: 2rem;

.toast {
  bottom: $fadein-height;

  img {
    width: 4rem;
  }
  &.active {
    visibility: visible;
    -webkit-animation: fadein 0.5s stay 3s 1s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, stay 3s 1s, fadeout 0.5s 4.5s;
  }
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: $fadein-height;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: $fadein-height;
    opacity: 1;
  }
}

@-webkit-keyframes stay {
}

@keyframes stay {
}

@-webkit-keyframes fadeout {
  from {
    bottom: $fadein-height;
    opacity: 1;
  }
  to {
    bottom: $fadeout-height;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: $fadein-height;
    opacity: 1;
  }
  to {
    bottom: $fadeout-height;
    opacity: 0;
  }
}
</style>
