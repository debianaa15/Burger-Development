<template>
  <div class="w-full min-h-screen flex flex-col bg-[#FFFDF9] items-center">
    <div class="w-full max-w-md mx-auto px-4 pt-8">
      <div class="flex items-center gap-2 mb-6">
        <button @click="$router.back()" class="focus:outline-none">
          <img src="/images/undo-alt.png" alt="Back" class="w-7 h-7" />
        </button>
        <span class="text-2xl text-amber-950 font-bold font-['Inter']">Checkout</span>
      </div>
      <div class="mb-6">
        <div class="text-lg font-semibold text-amber-950 mb-3">Delivery Details</div>
        <form class="flex flex-col gap-5">
          <div>
            <label class="block text-amber-950 font-medium mb-1">Address</label>
            <textarea class="w-full h-24 rounded-lg border border-amber-900 text-amber-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-transparent resize-none" v-model="address" />
          </div>
          <div>
            <label class="block text-amber-950 font-medium mb-1">Contact No.</label>
            <input type="text" class="w-full h-12 rounded-lg border border-amber-900 text-amber-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-transparent" v-model="contact" />
          </div>
        </form>
      </div>
      <div class="mt-10">
        <div class="bg-stone-100 rounded-[10px] border-2 border-dotted border-amber-900 p-5 mb-6">
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
        <button class="w-full h-12 bg-red-600 rounded-full text-white text-lg font-medium font-['Inter'] hover:bg-red-700 transition-colors">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// In a real app, get cart/payment data from store or props
const address = ref('');
const contact = ref('');
// Dummy values for now
const subtotal = ref(750);
const shippingFee = ref(20);
const total = computed(() => subtotal.value + shippingFee.value);
</script>
