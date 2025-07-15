<template>
  <div>
    <newsidebar
      v-if="showCheckout"
      :cart="cart"
      :subtotal="subtotal"
      :shippingFee="shippingFee"
      :total="total"
      :address="address"
      :contact="contact"
      @closeCheckout="showCheckout = false"
      @update:address="val => address = val"
      @update:contact="val => contact = val"
      @checkout="onCheckoutSidebar"
      @show-history="showHistory = true"
    ></newsidebar>
    <div v-else-if="showHistory" class="w-[350px] h-full relative bg-white shadow-[-2px_4px_6px_-1px_rgba(0,0,0,0.10)] shadow-[-2px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden">
      <!-- Header -->
      <div class="left-[20px] top-[23px] absolute text-amber-950 text-3xl font-semibold font-['Inter']">My Cart</div>
      <div class="left-[87px] top-[77px] absolute text-amber-950 text-lg font-medium font-['Inter'] cursor-pointer" :class="{ 'opacity-100': showHistory }" @click="showHistory = true">History</div>
      <div class="left-[22px] top-[77px] absolute text-amber-950 text-lg font-medium font-['Inter'] cursor-pointer" :class="{ 'opacity-50': showHistory }" @click="showHistory = false">Cart</div>
      <div class="w-16 h-0 left-[87px] top-[103px] absolute outline outline-2 outline-offset-[-1px] outline-amber-950" v-if="showHistory" />
      <div class="right-6 top-[26px] absolute text-amber-950 text-xs font-medium font-['Inter'] text-right w-[140px]">{{ currentDate }}</div>
      <div class="right-6 top-[44px] absolute text-amber-950 text-xs font-medium font-['Inter'] text-right w-[140px]">{{ currentTime }}</div>
      <div class="absolute left-0 top-[120px] w-full h-[calc(100%-120px)] overflow-y-auto pr-2">
        <HistoryComponent
          :history="Array.isArray(props.history) ? props.history : []"
          @reorder="$emit('reorder', $event)"
        />
      </div>
    </div>
    <div v-else class="w-[380px] h-full relative bg-white shadow-[-2px_4px_6px_-1px_rgba(0,0,0,0.10)] shadow-[-2px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden">
      <!-- Header -->
      <div class="left-[20px] top-[23px] absolute text-amber-950 text-3xl font-semibold font-['Inter']">My Cart</div>
      <div class="left-[87px] top-[77px] absolute text-amber-950 text-lg font-medium font-['Inter'] cursor-pointer" @click="showHistory = true">History</div>
      <div class="left-[22px] top-[77px] absolute text-amber-950 text-lg font-medium font-['Inter'] cursor-pointer" @click="showHistory = false">Cart</div>
      <div class="w-10 h-0 left-[20px] top-[103px] absolute outline outline-2 outline-offset-[-1px] outline-amber-950" v-if="!showHistory" />
      <div class="right-6 top-[26px] absolute text-amber-950 text-xs font-medium font-['Inter'] text-right w-[140px]">{{ currentDate }}</div>
      <div class="right-6 top-[44px] absolute text-amber-950 text-xs font-medium font-['Inter'] text-right w-[140px]">{{ currentTime }}</div>

      <!-- Cart Items -->
      <div>
        <div
          v-for="(item, idx) in cart"
          :key="item.title"
          :style="{ top: `${125 + idx * 112}px`, left: '12px' }"
          class="absolute w-[344px] h-24 bg-stone-100 rounded-[10px] flex items-center px-4 shadow"
        >
          <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden mr-4">
            <img class="w-16 h-16 object-cover" :src="item.imgSrc" :alt="item.title" />
          </div>
          <div class="flex-1 flex flex-col justify-center">
            <div class="flex justify-between items-center">
              <div class="text-amber-950 text-base font-semibold font-['Inter'] truncate max-w-[140px]">{{ item.title }}</div>
              <img class="w-4 h-4 cursor-pointer" src="/images/del.png" alt="remove" @click="$emit('remove', item)" />
            </div>
            <div class="flex justify-between items-center mt-1">
              <div class="text-amber-500 text-sm font-medium font-['Inter']">₱{{ item.price }}</div>
              <div class="flex items-center">
                <button class="w-5 h-5 bg-white rounded-sm flex items-center justify-center cursor-pointer mr-1 border border-amber-200" @click="$emit('decrement', item)"><span class="text-lg leading-none">-</span></button>
                <div class="text-center text-amber-950 text-sm font-semibold font-['Inter'] w-6">{{ item.qty }}</div>
                <button class="w-5 h-5 bg-white rounded-sm flex items-center justify-center cursor-pointer ml-1 border border-amber-200" @click="$emit('increment', item)"><span class="text-lg leading-none">+</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Payment Summary and Place Order always fixed at the bottom -->
      <div v-if="cart.length > 0" class="w-full absolute left-0 bottom-0 z-40 px-3 pb-4">
        <div class="w-[344px] mx-auto">
          <div class="bg-stone-100 rounded-[10px] border-2 border-dotted border-amber-900 p-5 mb-2">
            <div class="text-amber-900 text-lg font-medium mb-3">Payment Summary</div>
            <div class="flex justify-between items-center mb-1">
              <span class="text-amber-900/80 text-base font-normal">Sub Total</span>
              <span class="text-amber-900/80 text-base font-semibold">₱{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-amber-900/80 text-base font-normal">Shipping Fee</span>
              <span class="text-amber-900/80 text-base font-semibold">₱{{ shippingFee.toFixed(2) }}</span>
            </div>
            <div class="border-t border-amber-900/30 my-2"></div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-amber-900 text-base font-semibold">Total Payment</span>
              <span class="text-amber-900 text-base font-semibold">₱{{ total.toFixed(2) }}</span>
            </div>
          </div>
          <button class="w-full h-12 bg-red-600 rounded-full text-white text-lg font-medium font-['Inter'] hover:bg-red-700 transition-colors" @click="showCheckout = true">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import newsidebar from './newsidebar.vue';
import HistoryComponent from './history.vue';
const showCheckout = ref(false);
const showHistory = ref(false);
const address = ref('');
const contact = ref('');
const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  },
  history: {
    type: Array,
    default: () => []
  }
});

const currentDate = ref('');
const currentTime = ref('');

function updateDateTime() {
  const now = new Date();
  currentDate.value = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  currentTime.value = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}
onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
});


const subtotal = computed(() => props.cart.reduce((sum, item) => sum + item.price * item.qty, 0));
const shippingFee = computed(() => props.cart.length > 0 ? 20 : 0);
const total = computed(() => subtotal.value + shippingFee.value);

function onCheckoutSidebar() {
  // Always emit the current cart from props
  if (props.cart && props.cart.length > 0) {
    emit('checkout', props.cart);
  }
}

const emit = defineEmits(['remove', 'increment', 'decrement', 'checkout', 'reorder']);
</script>


