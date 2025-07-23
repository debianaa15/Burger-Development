<template>
  <div class="w-full min-h-screen flex flex-col bg-[#FFFDF9]">
    <!-- Header Bar -->
    <div class="w-full h-16 bg-amber-950 flex items-center px-4 fixed top-0 left-0 z-10" />
    <div class="flex items-center gap-4 absolute left-4 top-0 h-16 z-20 pointer-events-none">
      <img class="w-16 h-16" src="/images/logo.png" alt="logo" />
      <img class="w-[94px] h-[84px]" src="/images/3.png" alt="brand" />
    </div>

    <!-- Currency/User Section -->
    <div class="hidden md:flex items-center fixed gap-4" style="right: 20.5%; top: 18px; z-index:30;">
      <div class="relative">
        <button @click="showDropdown = !showDropdown" class="flex items-center gap-3 bg-transparent text-white text-lg font-medium font-['Inter'] px-2 py-1 rounded-lg focus:outline-none">
          <img :src="currencyFlag" class="w-8 h-8 rounded-full" alt="flag" />
          <span class="tracking-wide">{{ currency }}</span>
          <img src="/images/drpd.png" class="w-5 h-5 ml-1" alt="dropdown" />
        </button>
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-30 border border-amber-200">
          <div v-for="(label, code) in currencyLabels" :key="code" @click="selectCurrency(code, currencyIcons[code])" class="group cursor-pointer">
            <div class="flex items-center px-2 py-2 rounded-lg transition-colors group-hover:bg-amber-100">
              <img :src="currencyIcons[code]" class="w-6 h-6 rounded-full mr-2" :alt="code" />
              <span class="text-amber-950 text-base font-medium font-['Inter']">{{ label }}</span>
              <span class="text-amber-950 text-base font-medium font-['Inter'] ml-2">({{ code }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Username Dropdown -->
      <div class="relative inline-block text-left top-24 right-32">
        <button @click="showUserDropdown = !showUserDropdown" class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md outline outline-[0.75px] outline-stone-200 font-medium text-amber-950 hover:bg-stone-100 transition-colors">
          <img :src="userAvatar" class="w-8 h-8 rounded-full object-cover" alt="avatar" />
          <div class="flex flex-col items-start">
            <span class="text-base font-['Inter'] leading-none">{{ username }}</span>
            <span class="text-xs text-stone-500 font-['Inter'] leading-none">{{ userRole }}</span>
          </div>
          <svg class="w-4 h-4 text-amber-950" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <div v-if="showUserDropdown" class="absolute right-0 mt-2 w-44 h-20 bg-white rounded-lg shadow-md outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden z-50">
          <div class="w-40 h-8 left-[8px] top-[9px] absolute cursor-pointer hover:bg-stone-100 rounded-[5px] flex items-center" @click="openProfileSetting">
            <span class="ml-2 text-amber-950 text-xs font-medium font-['Inter']">Profile Settings</span>
          </div>
          <div class="w-40 h-8 left-[8px] top-[45px] absolute cursor-pointer hover:bg-stone-100 rounded-[5px] flex items-center" @click="onSignOut">
            <span class="ml-2 text-amber-950 text-xs font-medium font-['Inter']">Sign Out</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-row">
      <div v-if="!showProfileSetting" class="flex flex-col flex-1 px-12 pt-32 pb-4">
        <div class="flex items-center gap-4 mb-6">
          <button class="focus:outline-none" @click="goToLanding">
            <img src="/images/undo-alt.png" alt="Back" class="w-8 h-8" />
          </button>
          <span class="text-3xl text-amber-950 font-semibold font-['Inter']">Menu</span>
        </div>
        <div class="flex w-full gap-4 justify-start 2xl:pl-[18rem]">
          <!-- Hot Burger Section -->
          <div class="flex-shrink-0">
            <hotb @add-order="addToCart" :symbol="currencySymbols[currency]" />
          </div>
          <!-- Product Items -->
          <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 self-start">
            <item
              v-for="(menu, idx) in menus"
              :key="`${idx}-${currency}`"
              :img-src="menu.imgSrc"
              :title="menu.title"
              :desc="menu.desc"
              :price="menu.convertedPrice"
              :symbol="menu.symbol"
              :is-new="menu.isNew"
              @add-order="addToCart"
              class="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60 2xl:w-64 h-auto"
            />
          </div>
        </div>
      </div>

      <!-- Profile settings modal -->
      <div v-else class="flex flex-1 flex-row">
        <div class="flex flex-col flex-1 px-12 pt-32 pb-4 opacity-40 pointer-events-none select-none">
          <div class="flex items-center gap-4 mb-6">
            <button class="focus:outline-none">
              <img src="/images/undo-alt.png" alt="Back" class="w-8 h-8" />
            </button>
            <span class="text-3xl text-amber-950 font-semibold font-['Inter']">Menu</span>
          </div>
        </div>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <profilesetting @close="showProfileSetting = false" />
        </div>
      </div>

      <!-- Cart Sidebar -->
      <sidebar
        class="shrink-0 z-30 fixed right-0 top-0 h-full"
        :cart="cart"
        :history="history"
        :symbol="currencySymbols[currency]"
        :total="totalPrice"
        @increment="incrementQty"
        @decrement="decrementQty"
        @remove="removeItem"
        @checkout="handleCheckout"
        @reorder="handleReorder"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import hotb from '../../components/hotb.vue';
import item from '../../components/item.vue';
import profilesetting from '../../components/profilesetting.vue';
import sidebar from '../../components/sidebar.vue';
import { products } from '../../data/products.js';

const cart = ref([]);
const history = ref([]);
const router = useRouter();

// Currency state
const currency = ref('PHP');
const currencyFlag = ref('/images/ph.png');
const showDropdown = ref(false);

const currencySymbols = { PHP: '₱', USD: '$', KRW: '₩' };
const currencyLabels = { PHP: 'Philippine Peso', USD: 'US Dollar', KRW: 'Korean Won' };
const currencyIcons = { PHP: '/images/ph.png', USD: '/images/usa.png', KRW: '/images/sk.png' };
const exchangeRates = ref({ PHP: 1, USD: 0.018, KRW: 24.5 });

async function fetchRates() {
  try {
    exchangeRates.value = {
      PHP: 1,
      USD: 0.018,
      KRW: 24.5
    };
  } catch (e) {
    console.error('Failed to fetch exchange rates', e);
  }
}
onMounted(fetchRates);

const menus = computed(() => {
  const rate = exchangeRates.value[currency.value];
  const symbol = currencySymbols[currency.value];
  return products.map(p => ({
    ...p,
    convertedPrice: Math.round(p.price * rate),
    symbol: symbol
  }));
});

function selectCurrency(code, flag) {
  currency.value = code;
  currencyFlag.value = flag;
  showDropdown.value = false;
}

function addToCart(item) {
  const found = cart.value.find(i => i.title === item.title);
  if (found) found.qty += 1;
  else cart.value.push({ ...item, qty: 1 });
}

function handleCheckout(order) {
  if (Array.isArray(order) && order.length > 0) {
    const clonedItems = order.map(i => JSON.parse(JSON.stringify(i)));
    history.value.unshift({
      id: history.value.length + 1,
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      items: clonedItems
    });
    cart.value = [];
  }
}

function incrementQty(item) {
  const found = cart.value.find(i => i.title === item.title);
  if (found) found.qty += 1;
}

function decrementQty(item) {
  const found = cart.value.find(i => i.title === item.title);
  if (found && found.qty > 1) found.qty -= 1;
  else if (found && found.qty === 1) removeItem(item);
}

function removeItem(item) {
  cart.value = cart.value.filter(i => i.title !== item.title);
}

function handleReorder(item) {
  addToCart({ ...item });
}

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.convertedPrice * item.qty, 0);
});

const showUserDropdown = ref(false);
const showProfileSetting = ref(false);
const username = ref('John Doe');
const userRole = ref('Customer');
const userAvatar = ref('https://randomuser.me/api/portraits/men/32.jpg');

function openProfileSetting() {
  showUserDropdown.value = false;
  showProfileSetting.value = true;
}

function onSignOut() {
  showUserDropdown.value = false;
  router.push('/signin');
}

function goToLanding() {
  router.push('/landing');
}
</script>