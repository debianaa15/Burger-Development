<template>
  <div class="w-52 h-52
   sm:w-44 sm:h-44
    md:w-44 md:h-44
    lg:w-44 lg:h-44
    xl:w-[210px] xl:h-[212px]
    2xl:w-[215px] 2xl:h-[212px]
     relative bg-white 
     rounded-2xl shadow-md
     shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden">
    <div class="w-48 h-24 
    sm:w-40 sm:h-20
     md:w-48 md:h-24
      left-[11px] top-[11px]
       absolute bg-stone-100 rounded-[10px]" />
    <img 
      class="w-28 h-28 sm:w-20 sm:h-20 md:w-28 md:h-28 left-[48px] top-[2px] absolute cursor-pointer" 
      :src="imgSrc" 
      @click="showModal = true"
    />
    <div class="w-36 left-[15px] top-[121px] absolute justify-start text-amber-950 text-xs font-semibold font-['Inter']">{{ title }}</div>
    <div class="w-48 left-[15px] top-[140px] absolute justify-start text-amber-950 text-[9px] font-normal font-['Inter'] truncate-description">
      {{ truncatedDesc }}
    </div>
  <teleport to="body">
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div class="bg-white rounded-2xl p-6 max-w-xs w-full flex flex-col items-center relative">
        <button @click="showModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <img :src="imgSrc" alt="item" class="w-40 h-40 object-contain mb-4" />
        <div class="font-semibold text-amber-950 text-base mb-2">{{ title }}</div>
        <div class="text-xs text-amber-950 mb-2">{{ desc }}</div>
      </div>
    </div>
  </teleport>
    <div class="left-[15px] top-[179px] absolute justify-start text-amber-500 text-sm font-semibold font-['Inter']">{{ symbol }}{{ price }}</div>
    <button class="w-28 h-6 sm:w-20 sm:h-6 md:w-28 md:h-6 p-2.5 left-[90px] top-[176px] absolute bg-red-600 rounded-3xl inline-flex justify-center items-center gap-1.5" @click="addOrder">
      <img class="w-2 h-2" src="/images/plus.png" />
      <div class="justify-start text-white text-[11px] font-semibold font-['Inter']">Add Order</div>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  imgSrc: String,
  title: String,
  desc: String,
  price: [String, Number],
  symbol: String,
  isNew: Boolean
});

const showModal = ref(false);
const maxDescLength = 70;
const truncatedDesc = computed(() => {
  if (!props.desc) return '';
  return props.desc.length > maxDescLength ? props.desc.slice(0, maxDescLength) + '...' : props.desc;
});
const emit = defineEmits(['add-order']);
function addOrder() {
  emit('add-order', {
    imgSrc: props.imgSrc,
    title: props.title,
    price: Number(props.price),
    qty: 1
  });
}
</script>

<style scoped>
.truncate-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-clamp: 2;
}
</style>
