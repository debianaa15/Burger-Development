<template>
  <div class="w-screen h-screen fixed inset-0 z-50 bg-black/25 overflow-hidden flex items-center justify-center">
    <div class="w-96 h-96 bg-white rounded-lg shadow-xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] outline outline-[0.75px] outline-offset-[-0.75px] outline-gray-200 overflow-hidden relative flex flex-col items-center justify-center">
      <button @click="$emit('close')" class="absolute right-4 top-4 w-5 h-5 flex items-center justify-center bg-white rounded-[3px] border border-neutral-200">
        <img class="w-4 h-4" src="/images/cross-small.png" alt="Close" />
      </button>
      <img class="w-14 h-14 mt-6 mb-4" src="/images/confirm.png" alt="Confirmed" />
      <div class="text-center text-amber-950 text-2xl font-semibold font-['Inter'] mb-2">Order Placed Successfully!</div>
      <div class="text-center text-amber-950 text-base font-medium font-['Inter'] leading-normal mb-1">Thanks for your order, John!</div>
      <div class="text-center text-amber-950 text-sm font-normal font-['Inter'] mb-1">Order ID: TX-20250713-000093</div>
      <div class="text-center text-amber-950 text-base font-medium font-['Inter'] leading-normal mb-4">Your burgers are being prepared and will be on their way shortly.</div>
      <button @click="$emit('close')" class="w-36 h-8 bg-neutral-50 rounded-lg border border-stone-300 text-amber-950 text-sm font-medium font-['Inter'] mx-auto">Close</button>
    </div>
  </div>
</template>

<script setup>
// No script needed, emits 'close' on button click
</script>
