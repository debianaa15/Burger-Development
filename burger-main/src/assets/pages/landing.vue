<template>
  <div class="w-full min-h-screen relative bg-stone-50 overflow-hidden flex flex-col">
    <!-- Header Bar -->
    <div class="w-full h-16 bg-amber-950 flex items-center px-4 fixed top-0 left-0 z-10" />
    <!-- Logo and Brand Images -->
    <div class="flex items-center gap-4 absolute left-4 top-[-12px] z-20">
      <img class="w-16 h-16" src="/images/logo.png" alt="logo" />
      <img class="w-[94px] h-[84px]" src="/images/3.png" alt="brand" />
    </div>
    <!-- Decorative/Promo Images -->
    <div class="absolute top-[1.6rem] right-[5rem] z-10">
          <img src="/images/dots.png" alt="dots" class="absolute left-[-56px] top-[38px] rotate-180 w-[222px] h-32" />
                 <img src="/images/dots2.png" alt="dots" class="absolute right-[-5rem] top-[38px] w-[622px] h-[350px]" />
      <div class="relative flex items-center justify-center" style="width:730px; height:730px;">
        <div class="w-[401px] h-[654px] bg-[#D13725] rounded-b-3xl relative">
          
        </div>
        <img src="/images/b2.png" alt="b2" class="absolute top-0 left-0 w-full h-full object-contain pointer-events-none select-none" />
      </div>
    </div>
    <!-- Bottom left dots -->
    <img src="/images/dots.png" alt="dots" class="absolute left-0 bottom-0 w-[222px] h-32" />
   
    <!-- Main Text -->
    <div class="flex flex-col items-start justify-center h-[calc(100vh-4rem)] pl-8 pt-24 z-10 relative">
      <div class="text-red-700 text-5xl md:text-9xl font-semibold font-['Antonio']">CRISP, JUICY</div>
      <div class="text-amber-950 font-['Antonio'] font-semibold leading-none" style="font-size:clamp(3rem,15vw,205px);">LOADED</div>
      <div class="text-amber-500 text-2xl md:text-5xl font-medium font-poppins mt-4">A Better Way to Burger</div>
      <button 
        @click="goToMenu"
        class="w-52 h-14 p-2.5 mt-8 bg-red-600 rounded-3xl inline-flex justify-center items-center gap-3 hover:bg-red-700 transition-colors">
        <span class="text-white text-lg font-medium font-['Inter']">Buy Now</span>
      </button>
    </div>
    <!-- Currency/User Section -->
    <div class="hidden md:flex items-center absolute right-8 top-4 z-20">
      <div class="relative">
        <button @click="showDropdown = !showDropdown" class="flex items-center gap-3 bg-transparent text-white text-lg font-medium font-['Inter'] px-2 py-1 rounded-lg focus:outline-none">
          <img :src="currencyFlag" class="w-8 h-8 rounded-full" alt="flag" />
          <span class="tracking-wide">{{ currency }}</span>
          <img src="/images/drpd.png" class="w-5 h-5 ml-1" alt="dropdown" />
        </button>
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-30 border border-amber-200">
          <div @click="selectCurrency('PHP', '/images/ph.png')" class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-amber-100">
            <img src="/images/ph.png" class="w-6 h-6 rounded-full" alt="PH" />
            <span class="text-amber-950">PHP</span>
          </div>
          <div @click="selectCurrency('USD', '/images/usa.png')" class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-amber-100">
            <img src="/images/usa.png" class="w-6 h-6 rounded-full" alt="USA" />
            <span class="text-amber-950">USD</span>
          </div>
          <div @click="selectCurrency('SK', '/images/sk.png')" class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-amber-100">
            <img src="/images/sk.png" class="w-6 h-6 rounded-full" alt="SK" />
            <span class="text-amber-950">SK</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const currency = ref('PHP');
const currencyFlag = ref('/images/ph.png');
const showDropdown = ref(false);
const router = useRouter();
function selectCurrency(cur, flag) {
  currency.value = cur;
  currencyFlag.value = flag;
  showDropdown.value = false;
}
function goToMenu() {
  router.push({ name: 'menu' });
}
</script>
