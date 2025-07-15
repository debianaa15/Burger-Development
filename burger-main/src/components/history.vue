
<template>
  <div class="w-80 min-h-[762px] relative bg-white">
    <!-- History List -->
    <div class="px-2 pt-4">
      <div
        v-for="(order, oIdx) in [...history].reverse()"
        :key="order.id"
        class="bg-stone-100 rounded-[10px] mb-6 p-4 relative"
      >
        <div class="text-amber-950 text-lg font-semibold font-['Inter']">Order #: {{ order.id.toString().padStart(6, '0') }}</div>
        <div class="text-amber-950 text-xs font-normal font-['Inter'] mb-2">Delivered on {{ order.date }}</div>
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, idx) in order.items"
            :key="item.title + idx"
            class="bg-white rounded-[10px] flex items-center px-4 py-2 shadow-sm"
          >
            <div class="bg-stone-100 rounded-lg w-16 h-16 flex items-center justify-center mr-4">
              <img :src="item.imgSrc" class="w-14 h-14 object-contain" />
            </div>
            <div class="flex-1">
              <div class="text-amber-950 text-base font-semibold font-['Inter'] leading-tight">{{ item.title }}</div>
              <div class="text-amber-500 text-sm font-medium font-['Inter']">₱{{ item.price.toFixed(2) }}</div>
            </div>
            <button
              class="bg-red-600 rounded-3xl px-6 py-1 text-white text-xs font-semibold font-['Inter'] ml-2 focus:outline-none hover:bg-red-700 transition"
              @click="$emit('reorder', item)"
            >Reorder</button>
          </div>
        </div>
      </div>
      <div v-if="!history || history.length === 0" class="text-center text-amber-950 text-base font-medium mt-16">No orders yet.</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  history: {
    type: Array,
    default: () => []
  }
});
</script>
