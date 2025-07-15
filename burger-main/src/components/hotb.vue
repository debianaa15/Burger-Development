<template>
  <div
    class="relative bg-white rounded-2xl shadow-md shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden
      w-[350px] h-[520px]
      sm:w-[350px] sm:h-[520px]
      md:w-[400px] md:h-[600px]
      lg:w-[450px] lg:h-[667px]"
  >
    <!-- Image background -->
    <div class="absolute bg-stone-100 rounded-[10px] left-[22px] top-[12px]
     w-[325px] h-60 sm:w-[325px]
      sm:h-60 md:w-[370px] 
      md:h-80 lg:w-[410px] lg:h-96" />
    <div class="absolute flex justify-center items-center left-0 top-0 w-full h-60 sm:h-60 md:h-80 lg:h-96 cursor-pointer" @click="showModal = true">
      <img class="object-cover w-56 h-60 sm:w-56 sm:h-60 md:w-64 md:h-80 lg:w-65 lg:h-96" src="/images/menu/b7.png" alt="burger" />
    </div>
    <!-- Title -->
    <div class="absolute left-[17px] top-[340px] sm:left-[17px] sm:top-[340px] md:left-[22px] md:top-[410px] lg:left-[27px] lg:top-[449px] justify-start text-amber-950 text-xl md:text-2xl font-semibold font-['Inter']">Ultimate Cheddar Smash</div>
    <!-- Description -->
    <div class="absolute w-72 h-14 left-[17px] top-[375px] sm:w-72 sm:h-14 sm:left-[17px] sm:top-[375px] md:w-80 md:h-16 md:left-[22px] md:top-[454px] lg:w-96 lg:h-16 lg:left-[27px] lg:top-[494px] justify-start text-amber-950 text-sm md:text-base font-normal font-['Inter']">Two flame-grilled beef patties smothered in melted cheddar, layered with pickles, grilled onions, and signature sauce on a toasted sesame bun.</div>
    <!-- Price -->
    <div class="absolute left-[17px] top-[455px] sm:left-[17px] sm:top-[455px] md:left-[22px] md:top-[550px] lg:left-[27px] lg:top-[596px] justify-start text-amber-500 text-2xl md:text-3xl font-semibold font-['Inter']">₱250.00</div>
    <!-- Star and rating -->
    <div class="flex items-center absolute left-[260px] top-[345px] sm:left-[260px] sm:top-[345px] md:left-[320px] md:top-[415px] lg:left-[380px] lg:top-[455px]">
      <span class="w-5 h-5 text-yellow-400 text-xl flex items-center justify-center">⭐</span>
      <span class="ml-1 text-amber-950 text-xs font-medium font-['Inter']">2.5k+</span>
    </div>
    <!-- Hot badge -->
    <div class="absolute w-16 h-8 pl-2.5 pr-3.5 py-2.5 left-[23px] top-[25px] sm:left-[23px] sm:top-[25px] md:left-[28px] md:top-[30px] lg:left-[33px] lg:top-[35px] bg-amber-500 rounded-[20px] inline-flex justify-center items-center gap-0.5">
      <span class="w-6 h-6 text-xl flex items-center justify-center">🔥</span>
      <span class="justify-start text-white text-base font-medium font-['Inter']">Hot</span>
    </div>
    <!-- Add Order button -->
    <button type="button" class="absolute w-[520px] 
    h-12 p-2.5 left-[180px] 
    top-[150px] sm:w-[140px] 
    sm:h-12 sm:left-[180px] 
    sm:top-[450px] md:w-[160px]
     md:h-14 md:left-[200px]
      md:top-[545px] lg:w-[190px]
       lg:h-14 lg:left-[224px]
        lg:top-[591px] bg-red-600
         rounded-3xl inline-flex justify-center items-center gap-3 hover:bg-red-700 transition-colors" @click="addOrder">
      <img src="/images/plus.png" alt="plus" class="w-4 h-4 object-contain flex items-center justify-center" />
      <span class="justify-start text-white text-base md:text-lg font-medium font-['Inter']">Add Order</span>
    </button>
    <!-- Modal -->
    <teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div class="bg-white rounded-2xl p-6 max-w-xs w-full flex flex-col items-center relative">
          <button @click="showModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
          <div class="flex justify-center items-center w-full mb-4">
            <img src="/images/menu/b7.png" alt="item" class="w-40 h-40 object-contain" />
          </div>
          <div class="font-semibold text-amber-950 text-base mb-2">Ultimate Cheddar Smash</div>
          <div class="text-xs text-amber-950 mb-2">Two flame-grilled beef patties smothered in melted cheddar, layered with pickles, grilled onions, and signature sauce on a toasted sesame bun.</div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(false);
const emit = defineEmits(['add-order']);
function addOrder() {
  emit('add-order', {
    imgSrc: '/images/menu/b7.png',
    title: 'Ultimate Cheddar Smash',
    price: 250,
    qty: 1
  });
}
</script>
