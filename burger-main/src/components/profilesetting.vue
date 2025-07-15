<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
    <div class="w-[594px] min-h-[541px] relative bg-white rounded-2xl shadow-2xl outline outline-[0.75px] outline-offset-[-0.75px] outline-stone-200 overflow-hidden flex flex-col items-center justify-center">
      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute right-4 top-4 text-stone-400 hover:text-stone-700 text-xl font-bold z-10">
        ×
      </button>
      <!-- Title -->
      <div class="mb-8 mt-8 text-amber-950 text-3xl font-semibold font-['Inter']">My Profile</div>
      <!-- Name Card -->
      <div class="w-96 h-28 mb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-200 overflow-hidden flex flex-col justify-center relative px-6 py-4">
        <div class="text-amber-950 text-lg font-medium font-['Inter']">Name</div>
        <div class="flex items-center mt-2">
          <input v-if="editField==='name'" v-model="name" @blur="editField=''" class="text-amber-950 text-xl font-semibold font-['Inter'] bg-transparent outline-none border-b border-amber-300 flex-1" />
          <span v-else class="text-amber-950 text-xl font-semibold font-['Inter'] flex-1">{{ name }}</span>
          <button @click="editField='name'" class="ml-2"><img src="/images/pencil.png" class="w-5 h-5" alt="Edit" /></button>
        </div>
      </div>
      <!-- Email Card -->
      <div class="w-96 h-28 mb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-200 overflow-hidden flex flex-col justify-center relative px-6 py-4">
        <div class="text-amber-950 text-lg font-medium font-['Inter']">Email</div>
        <div class="flex items-center mt-2">
          <input v-if="editField==='email'" v-model="email" @blur="editField=''" class="text-amber-950 text-xl font-semibold font-['Inter'] bg-transparent outline-none border-b border-amber-300 flex-1" />
          <span v-else class="text-amber-950 text-xl font-semibold font-['Inter'] flex-1">{{ email }}</span>
          <button @click="editField='email'" class="ml-2"><img src="/images/pencil.png" class="w-5 h-5" alt="Edit" /></button>
        </div>
      </div>
      <!-- Password Card -->
      <div class="w-96 h-28 mb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-200 overflow-hidden flex flex-col justify-center relative px-6 py-4">
        <div class="text-amber-950 text-lg font-medium font-['Inter']">Password</div>
        <div class="flex items-center mt-2">
          <input v-if="editField==='password'" v-model="password" @blur="editField=''" type="password" class="text-amber-950 text-xl font-semibold font-['Inter'] bg-transparent outline-none border-b border-amber-300 flex-1" />
          <span v-else class="text-amber-950 text-xl font-semibold font-['Inter'] flex-1 tracking-widest select-none">{{ maskedPassword }}</span>
          <button @click="editField='password'" class="ml-2"><img src="/images/pencil.png" class="w-5 h-5" alt="Edit" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const name = ref('John Doe');
const email = ref('johndoe@gmail.com');
const password = ref('password123');
const editField = ref('');

const maskedPassword = computed(() => '•'.repeat(password.value.length));
</script>

<style scoped>
/* No extra styles needed, all Tailwind */
</style>
