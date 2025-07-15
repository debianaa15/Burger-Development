<template>
  <button
    class="w-64 h-14 p-2.5 bg-red-600 rounded-3xl inline-flex justify-center items-center gap-3 hover:bg-red-700 transition-colors"
    type="button"
  >
    <img class="w-4 h-4" :src="iconSrc" alt="plus icon" />
    <span class="text-white text-lg font-medium font-['Inter']">Add Order</span>
  </button>
</template>

<script setup>
import plusIcon from '/public/images/plus.png';
const iconSrc = plusIcon;
</script>
