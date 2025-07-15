<template>
  <div class="w-full min-h-screen flex flex-col bg-[#FFFDF9]">
    <!-- Header Bar (copied from landing.vue) -->
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
          <div @click="selectCurrency('SK', '/images/sk.png')" class="group cursor-pointer">
            <div class="flex items-center px-2 py-2 rounded-lg transition-colors group-hover:bg-amber-100">
              <img src="/images/sk.png" class="w-6 h-6 rounded-full mr-2" alt="SK" />
              <span class="text-amber-950 text-base font-medium font-['Inter']">Korean Won</span>
              <span class="text-amber-950 text-base font-medium font-['Inter'] ml-2">(KRW)</span>
            </div>
          </div>
          <div @click="selectCurrency('PHP', '/images/ph.png')" class="group cursor-pointer">
            <div class="flex items-center px-2 py-2 rounded-lg transition-colors group-hover:bg-amber-100">
              <img src="/images/ph.png" class="w-6 h-6 rounded-full mr-2" alt="PH" />
              <span class="text-amber-950 text-base font-medium font-['Inter']">Philippine Peso</span>
              <span class="text-amber-950 text-base font-medium font-['Inter'] ml-2">(PHP)</span>
            </div>
          </div>
          <div @click="selectCurrency('USD', '/images/usa.png')" class="group cursor-pointer">
            <div class="flex items-center px-2 py-2 rounded-lg transition-colors group-hover:bg-amber-100">
              <img src="/images/usa.png" class="w-6 h-6 rounded-full mr-2" alt="USA" />
              <span class="text-amber-950 text-base font-medium font-['Inter']">US Dollar</span>
              <span class="text-amber-950 text-base font-medium font-['Inter'] ml-2">(USD)</span>
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
        <div v-if="showUserDropdown" class="absolute right-0 mt-2 w-44 h-20 bg-white rounded-lg shadow-md shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden z-50">
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
        <div class="flex w-full gap-4
         justify-start pl-0 
         md:pl-0 lg:pl-[-1rem]
        xl:pl-[-2rem] 
        2xl:pl-[18rem]">
          <!-- Hot Burger Section (large card) -->
          <div class="flex-shrink-0">
            <hotb @add-order="addToCart" />
          </div>
          <!-- Menu Items Grid (smaller cards) -->
          <div class="grid gap-4
            sm:grid-cols-1
            md:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-2
            2xl:grid-cols-2
            self-start">
            <item
              v-for="(menu, idx) in menus"
              :key="idx"
              :img-src="menu.imgSrc"
              :title="menu.title"
              :desc="menu.desc"
              :price="menu.price"
              :is-new="menu.isNew"
              @add-order="addToCart"
              class="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60 2xl:w-64 h-auto"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex flex-1 flex-row">
        <div class="flex flex-col flex-1 px-12 pt-32 pb-4 opacity-40 pointer-events-none select-none">
          <div class="flex items-center gap-4 mb-6">
            <button class="focus:outline-none">
              <img src="/images/undo-alt.png" alt="Back" class="w-8 h-8" />
            </button>
            <span class="text-3xl text-amber-950 font-semibold font-['Inter']">Menu</span>
          </div>
          <div class="flex w-full gap-4
           justify-start pl-0 
           md:pl-0 lg:pl-[-1rem]
          xl:pl-[-2rem] 
          2xl:pl-[18rem]">
            <!-- Hot Burger Section (large card) -->
            <div class="flex-shrink-0">
              <hotb />
            </div>
            <!-- Menu Items Grid (smaller cards) -->
            <div class="grid gap-4
              sm:grid-cols-1
              md:grid-cols-2
              lg:grid-cols-2
              xl:grid-cols-2
              2xl:grid-cols-2
              self-start">
              <item
                v-for="(menu, idx) in menus"
                :key="idx"
                :img-src="menu.imgSrc"
                :title="menu.title"
                :desc="menu.desc"
                :price="menu.price"
                :is-new="menu.isNew"
                class="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60 2xl:w-64 h-auto"
              />
            </div>
          </div>
        </div>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <profilesetting @close="showProfileSetting = false" />
        </div>
      </div>
      <sidebar
        class="shrink-0 z-30 fixed right-0 top-0 h-full"
        :cart="cart"
        :history="history"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import hotb from '../../components/hotb.vue';
import item from '../../components/item.vue';
import profilesetting from '../../components/profilesetting.vue';
import sidebar from '../../components/sidebar.vue';

const cart = ref([]);
const history = ref([]);
const router = useRouter();


// Username dropdown logic
const showUserDropdown = ref(false);
const showProfileSetting = ref(false);
// Change these values as needed
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

function addToCart(item) {
  const found = cart.value.find(i => i.title === item.title);
  if (found) {
    found.qty += 1;
  } else {
    cart.value.push({ ...item });
  }
}

function handleCheckout(order) {
  // Defensive: Only add to history if order is a non-empty array
  if (Array.isArray(order) && order.length > 0) {
    // Deep clone items to avoid reactivity issues
    const clonedItems = order.map(i => JSON.parse(JSON.stringify(i)));
    history.value.unshift({
      id: history.value.length + 1, // Keep as number
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      items: clonedItems,
    });
    // Clear cart
    cart.value = [];
  }
}

function handleReorder(item) {
  addToCart({ ...item });
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

const currency = ref('PHP');
const currencyFlag = ref('/images/ph.png');
const showDropdown = ref(false);
function selectCurrency(cur, flag) {
  currency.value = cur;
  currencyFlag.value = flag;
  showDropdown.value = false;
}

function goToLanding() {
  router.push('/landing');
}

const menus = [
  {
    imgSrc: '/images/menu/b2.png',
    title: 'Smoky Bacon Blaze',
    desc: 'Stacked with crispy bacon, a grilled beef patty, smoky barbecue sauce, fresh lettuce, and cheddar.',
    price: 280,
    isNew: true,
  },
  {
    imgSrc: '/images/menu/b3.png',
    title: 'Classic Quarter King',
    desc: 'A thick, juicy beef patty with cheddar cheese, pickles, onions, ketchup, and mustard on a toasted bun.',
    price: 200,
    isNew: false,
  },
  {
    imgSrc: '/images/menu/b4.png',
    title: 'Mushroom Melt Stack',
    desc: 'Savory sautéed mushrooms, crispy bacon, and melted cheddar over a juicy beef patty.',
    price: 250,
    isNew: false,
  },
  {
    imgSrc: '/images/menu/b5.png',
    title: 'Double Trouble Melt',
    desc: 'Two crispy-edged beef patties, layered with melted cheddar, tangy pickles, and house sauce.',
    price: 220,
    isNew: true,
  },
  {
    imgSrc: '/images/menu/b6.png',
    title: 'Crunch Royale',
    desc: 'A golden, crunchy fried chicken fillet with fresh lettuce and creamy spiced mayo.',
    price: 220,
    isNew: false,
  },
  {
    imgSrc: '/images/menu/b7.png',
    title: 'Ultimate Cheddar Smash',
    desc: 'Two flame-grilled beef patties smothered in melted cheddar, layered with pickles, grilled onions, and signature sauce on a toasted sesame bun.',
    price: 250,
    isNew: false,
  },
];
</script>
