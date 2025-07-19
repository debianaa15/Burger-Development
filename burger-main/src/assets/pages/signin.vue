<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-neutral-50 py-8">
    <div class="w-full max-w-[952px] bg-white rounded-lg shadow-xl outline outline-[0.75px] outline-offset-[-0.75px] outline-gray-200 overflow-hidden p-6 md:p-12 flex flex-col items-center">
      <img
        src="/images/logo.png"
        alt="Logo"
        class="w-40 h-40 md:w-64 md:h-64 object-contain mb-2 mx-auto"
      />
      <h2 class="text-amber-950 text-3xl font-semibold font-['Poppins'] font-poppins mb-8 text-center w-full">Sign In</h2>
      
      <form class="w-full max-w-md flex flex-col gap-4 mx-auto" @submit.prevent="handleLogin">
        <div class="w-full flex flex-col items-center">
          <div class="w-80">
            <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left">Email</label>
            <TypeBox v-model="email" placeholder="Enter your email" type="email" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center">
          <div class="w-80">
            <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left">Password</label>
            <TypeBox v-model="password" placeholder="Enter your password" type="password" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center">
          <div class="w-80">
            <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left">Role</label>
            <select v-model="role" class="w-full p-2 border border-gray-300 rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        <div class="mt-4 w-full flex justify-center">
          <button type="submit">
            <SignButton />
          </button>
        </div>
      </form>

      <div class="flex flex-col md:flex-row items-center justify-center gap-2 mt-6 w-full max-w-md mx-auto text-center">
        <span class="text-amber-950/70 text-sm font-normal font-poppins">Don’t have an account yet?</span>
        <span
          class="text-amber-950/70 text-sm font-semibold font-poppins cursor-pointer hover:underline"
          @click="goToSignup"
        >Sign up here!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TypeBox from '../../components/typebox.vue';
import SignButton from '../../components/signbutton.vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const role = ref('user');

const router = useRouter();

function goToSignup() {
  router.push('/signup');
}

function handleLogin() {
  alert(`Logged in as ${role.value}`);
  if (role.value === 'admin') {
    router.push('/admin');
  } else if (role.value === 'staff') {
    router.push('/staff');
  } else {
    router.push('/landing');
  }
}

</script>
