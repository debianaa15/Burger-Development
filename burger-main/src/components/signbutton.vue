<template>
  <button
    data-property-1="Default"
    class="w-80 h-11 p-2.5 bg-red-600 rounded-3xl inline-flex justify-center items-center gap-3 focus:outline-none hover:bg-red-700 transition-colors"
  >
    <span class="justify-start text-white text-base font-medium font-['Inter']">
      {{ label || 'Sign In' }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Sign In',
  },
});
</script>
