


<template>
  <div>
    <confirm v-if="showConfirmation" @close="closeConfirmation" />
    <div v-else class="w-96 h-screen relative bg-white shadow-[-2px_4px_6px_-1px_rgba(0,0,0,0.10)] shadow-[-2px_2px_4px_-2px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden p-6 flex flex-col">
      <div class="flex items-center mb-6">
        <button @click="$emit('closeCheckout')" class="mr-3 focus:outline-none">
          <img class="w-6 h-6" src="/images/undo-alt.png" alt="Back" />
        </button>
        <div class="text-amber-950 text-3xl font-semibold font-['Inter']">Checkout</div>
      </div>
      <div class="text-amber-950 text-lg font-semibold font-['Inter'] mb-2">Delivery Details</div>
      <div class="mb-4">
        <div class="text-amber-950 text-base font-medium font-['Inter'] mb-1">Address</div>
        <textarea class="w-full h-24 rounded-[10px] border border-amber-950 bg-white text-amber-950 px-3 py-2 focus:outline-none resize-none" v-model="address" placeholder="Enter address..." />
      </div>
      <div class="mb-8">
        <div class="text-amber-950 text-base font-medium font-['Inter'] mb-1">Contact No.</div>
        <input type="text" class="w-full h-12 rounded-[10px] border border-amber-950 bg-white text-amber-950 px-3 py-2 focus:outline-none" v-model="contact" placeholder="Enter contact no..." />
      </div>
      <div class="bg-stone-100 rounded-[10px] border-2 border-dotted border-amber-900 p-5 mb-2 w-[344px] mx-auto absolute left-0 right-0 bottom-20">
        <div class="text-amber-900 text-lg font-medium mb-3">Payment Summary</div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-amber-900/80 text-base font-normal">Sub Total</span>
          <span class="text-amber-900/80 text-base font-semibold">₱{{ Number(subtotal).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-amber-900/80 text-base font-normal">Shipping Fee</span>
          <span class="text-amber-900/80 text-base font-semibold">₱{{ Number(shippingFee).toFixed(2) }}</span>
        </div>
        <div class="border-t border-amber-900/30 my-2"></div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-amber-900 text-base font-semibold">Total Payment</span>
          <span class="text-amber-900 text-base font-semibold">₱{{ Number(total).toFixed(2) }}</span>
        </div>
      </div>
<button class="w-full h-12 bg-red-600 rounded-full text-white text-lg font-medium font-['Inter'] hover:bg-red-700 transition-colors absolute left-0 right-0 bottom-4 mx-auto" style="width:344px;" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import confirm from './confirm.vue';
const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  },
  subtotal: {
    type: [Number, String],
    default: 0
  },
  shippingFee: {
    type: [Number, String],
    default: 0
  },
  total: {
    type: [Number, String],
    default: 0
  },
  address: {
    type: String,
    default: ''
  },
  contact: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['closeCheckout', 'update:address', 'update:contact', 'checkout']);
const address = ref(props.address);
const contact = ref(props.contact);
const showConfirmation = ref(false);



function checkout() {
  emit('checkout', props.cart);
  showConfirmation.value = true;
}

function closeConfirmation() {
  showConfirmation.value = false;
  emit('closeCheckout');
  // After confirmation closes, show history in sidebar
  // Use a custom event so sidebar can set showHistory = true
  emit('show-history');
}

// Keep address/contact in sync with parent
watch(() => props.address, val => { if (val !== address.value) address.value = val; });
watch(() => props.contact, val => { if (val !== contact.value) contact.value = val; });

// Emit changes to parent
watch(address, val => emit('update:address', val));
watch(contact, val => emit('update:contact', val));
</script>
