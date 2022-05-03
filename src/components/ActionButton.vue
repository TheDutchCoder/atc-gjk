<template>
  <div>
    <button
      class="relative group select-none"
      v-bind="$attrs"
      :class="baseClasses"
    >
      <span
        class="absolute inset-0 bg-opacity-50 transition-transform transform"
        :class="backClasses"
      />
      <span
        class="absolute inset-0 bg-gray-200"
        :class="midClasses"
      />
      <span
        class="flex justify-center items-center bg-white font-bold transition-all transform"
        :class="frontClasses"
      >
        <slot />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { toRefs, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  isPrimary: {
    type: Boolean,
    default: false,
  },

  isSecondary: {
    type: Boolean,
    default: false,
  },
})

const { size, isDisabled, isPrimary, isSecondary } = toRefs(props)

const baseClasses = computed(() => {
  switch (size.value) {
    case 'control':
      return ['w-7 min-h-7']

    case 'xs':
      return []

    case 'md':
    default:
      return []
  }
})

const backClasses = computed(() => {
  const base = [
    'blur-[2px]',
    !isPrimary.value && !isSecondary.value && 'bg-gray-800',
    isPrimary.value && 'bg-blue-800',
    isSecondary.value && 'bg-blue-600',
  ]

  switch (size.value) {
    case 'control':
      return [
        ...base,
        'rounded-sm translate-y-[1px] group-active:translate-y-[0px] group-hover:translate-y-[2px]',
      ]

    case 'xs':
      return [
        ...base,
        'rounded translate-y-[2px] group-active:translate-y-[1px] group-hover:translate-y-[4px]',
      ]

    case 'sm':
      return [
        ...base,
        'rounded translate-y-[2px] group-active:translate-y-[1px] group-hover:translate-y-[4px]',
      ]

    case 'md':
    default:
      return [
        ...base,
        'rounded translate-y-[2px] group-active:translate-y-[1px] group-hover:translate-y-[4px]',
      ]
  }
})

const midClasses = computed(() => {
  const base = [
    !isPrimary.value && !isSecondary.value && 'group-hover:bg-gray-300',
    isPrimary.value && 'bg-blue-800 group-hover:bg-blue-900',
    isSecondary.value && 'bg-blue-400 group-hover:bg-blue-500',
  ]

  switch (size.value) {
    case 'control':
      return [
        ...base,
        'w-7 min-h-7 p-[2px] rounded-sm',
      ]

    case 'xs':
      return [
        ...base,
        'py-1 px-1 rounded',
      ]

    case 'sm':
      return [
        ...base,
        'py-2 px-5 rounded',
      ]

    case 'md':
    default:
      return [
        ...base,
        'py-3 px-7 rounded',
      ]

    case 'lg':
      return [
        ...base,
        'py-4 px-8 rounded',
      ]
  }
})

const frontClasses = computed(() => {
  const base = [
    !isPrimary.value && !isSecondary.value && !isDisabled.value && 'text-gray-800 group-hover:bg-gray-100',
    isDisabled.value && 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed',
    isPrimary.value && 'bg-blue-500 border-blue-700 text-white group-hover:bg-blue-600',
    isSecondary.value && 'bg-blue-200 border-blue-300 text-blue-700 group-hover:bg-blue-300',
  ]

  switch (size.value) {
    case 'control':
      return [
        ...base,
        !isDisabled.value && 'group-active:-translate-y-[0px] group-hover:-translate-y-[3px]',
        'absolute inset-0 border rounded-sm text-xs -translate-y-[1px]',
      ]

    case 'xs':
      return [
        ...base,
        !isDisabled.value && 'group-active:-translate-y-[0px] group-hover:-translate-y-[6px]',
        'py-1 px-1 text-xs rounded -translate-y-[4px] group-active:-translate-y-[2px] group-hover:-translate-y-[6px]',
      ]

    case 'sm':
      return [
        ...base,
        !isDisabled.value && 'group-active:-translate-y-[0px] group-hover:-translate-y-[6px]',
        'py-2 px-5 text-sm rounded -translate-y-[4px] group-active:-translate-y-[2px] group-hover:-translate-y-[6px]',
      ]

    case 'md':
    default:
      return [
        ...base,
        !isDisabled.value && 'group-active:-translate-y-[0px] group-hover:-translate-y-[6px]',
        'py-2 px-7 text-sm rounded -translate-y-[4px] group-active:-translate-y-[2px] group-hover:-translate-y-[6px]',
      ]

    case 'lg':
      return [
        ...base,
        !isDisabled.value && 'group-active:-translate-y-[0px] group-hover:-translate-y-[6px]',
        'py-3 px-8 text-xl rounded -translate-y-[4px] group-active:-translate-y-[2px] group-hover:-translate-y-[6px]',
      ]
  }
})
</script>
