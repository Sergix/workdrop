<template>
  <div class="email" :class="{ success }">
    <input
      v-model="input"
      type="email"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
    />
    <svg viewBox="0 0 16 16">
      <path
        d="M10.8000002,10.8000002 C9.85000038,11.6500006 9.18349609,12 8,12 C5.80000019,12 4,10.1999998 4,8 C4,5.80000019 5.80000019,4 8,4 C10.1999998,4 12,6 12,8 C12,9.35332031 12.75,9.5 13.5,9.5 C14.25,9.5 15,8.60000038 15,8 C15,4 12,1 8,1 C4,1 1,4 1,8 C1,12 4,15 8,15 C12,15 15,12 15,8"
      ></path>
      <polyline
        points="5 8.375 7.59090909 11 14.5 4"
        transform="translate(0 -0.5)"
      ></polyline>
    </svg>
  </div>
</template>

<script>
const EMAIL_VALIDATOR = Object.freeze(
  new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
      '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  )
)

export default {
  name: 'EmailInput',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: this.value,
      success: false,
    }
  },
  mounted() {
    this.success = EMAIL_VALIDATOR.test(this.input)
    if (this.success) this.$emit('validate', true)
    else this.$emit('validate', false)
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)

      this.input = value
      this.success = EMAIL_VALIDATOR.test(this.input)
      if (this.success) this.$emit('validate', true)
      else this.$emit('validate', false)
    },
  },
}
</script>

<style scoped lang="scss">
$border: #121212;
$success: #4fed77;
$textColor: #121212;
$placeholderColor: #c7c8cc;
$inputBorder: 1px solid #121212;
$inputBorderRadius: 7px;
$inputShadow: 0 4px 12px -2px rgba(#6b75a1, 0.16);
$inputBackground: #fafafa;

.email {
  position: relative;
  width: 100%;
  input {
    outline: none;
    width: 100%;
    border: $inputBorder;
    border-radius: $inputBorderRadius;
    line-height: 24px;
    @apply py-3;
    @apply px-4;
    box-shadow: $inputShadow;
    color: $textColor;
    background: $inputBackground;
    &::-webkit-input-placeholder {
      color: $placeholderColor;
    }
    &:-moz-placeholder {
      color: $placeholderColor;
    }
    &::-moz-placeholder {
      color: $placeholderColor;
    }
    &:-ms-input-placeholder {
      color: $placeholderColor;
    }
  }
  svg {
    position: absolute;
    z-index: 1;
    right: 14px;
    top: 50%;
    width: 20px;
    height: 20px;
    fill: none;
    margin: -10px 0 0 0;
    polyline,
    path {
      stroke: $border;
      stroke-width: 1.4;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.3s ease 0s;
    }
    path {
      stroke-dasharray: 64;
      stroke-dashoffset: 127;
      transition: stroke-dasharray 0.8s ease 0.8s,
        stroke-dashoffset 0.8s ease 0.5s;
    }
    polyline {
      stroke-dasharray: 18;
      stroke-dashoffset: 18;
      transition: stroke-dashoffset 0.5s ease 0s;
    }
  }
  &.success {
    svg {
      polyline,
      path {
        stroke: $success;
      }
      path {
        stroke-dasharray: 46;
        stroke-dashoffset: 150;
        transition: stroke-dasharray 0.6s ease 0s,
          stroke-dashoffset 0.8s ease 0.3s, stroke 0.3s ease 0.6s;
      }
      polyline {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 0.5s ease 0.6s, stroke 0.3s ease 0.6s;
      }
    }
  }
}
</style>
