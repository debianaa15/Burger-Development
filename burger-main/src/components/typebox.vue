
<template>
  <div :class="[sizeClass, 'bg-neutral-50 rounded-lg border border-stone-300 flex items-center px-4']">
    <input
      :type="type"
      class="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Type here...'
  },
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    default: 'w-80 h-12'
  }
});

const sizeClass = props.size;
</script>