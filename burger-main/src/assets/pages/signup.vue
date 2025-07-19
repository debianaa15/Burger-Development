<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-neutral-50 py-8">
    <div class="w-full max-w-[952px] bg-white rounded-lg shadow-xl outline outline-[0.75px] outline-offset-[-0.75px] outline-gray-200 overflow-hidden p-6 md:p-12 flex flex-col items-center">
      <h2 class="text-amber-950 text-3xl font-semibold font-poppins mb-2 text-center w-full">Create an account</h2>
      <div class="w-full max-w-[458px] text-center text-amber-950 text-base font-normal font-['Inter'] leading-normal mb-8 mx-auto">
        Join the burger party! Save your faves, track your orders, and unlock cheesy, beefy goodness every time you log in.
      </div>
      <form class="w-full max-w-2xl flex flex-col gap-6 mx-auto" @submit.prevent="handleSignup">
        <div class="flex flex-col w-full items-center">
          <div class="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <div class="flex flex-col w-full md:w-auto items-center">
              <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left w-44 md:w-44 w-full">First Name</label>
              <TypeBox v-model="firstName" placeholder="First name" size="w-44 h-12 md:w-44 w-full" />
            </div>
            <div class="flex flex-col w-full md:w-auto items-center mt-4 md:mt-0">
              <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left w-44 md:w-44 w-full">Last Name</label>
              <TypeBox v-model="lastName" placeholder="Last name" size="w-44 h-12 md:w-44 w-full" />
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center w-full">
          <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left w-96">Email</label>
          <div class="w-96 h-12">
            <TypeBox v-model="email" placeholder="Your email address" type="email" size="w-96 h-12" />
          </div>
        </div>

        <div class="flex flex-col items-center w-full">
          <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left w-96">Password</label>
          <div class="w-96 h-12">
            <TypeBox v-model="password" placeholder="Your password" type="password" size="w-96 h-12" />
          </div>
        </div>

        <!-- 🔽 Role Selection -->
        <div class="flex flex-col items-center w-full">
          <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left w-96">Role</label>
          <div class="w-96 h-12">
            <select v-model="role" class="w-full p-2 border border-gray-300 rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        <div class="mt-4 w-full flex justify-center">
          <button type="submit">
            <SignButton label="Sign Up" />
          </button>
        </div>
      </form>

      <div class="flex flex-col md:flex-row items-center justify-center gap-2 mt-6 w-full max-w-md mx-auto text-center">
        <span class="text-amber-950/70 text-sm font-normal font-poppins">Already a member?</span>
        <span class="text-amber-950/70 text-sm font-semibold font-poppins cursor-pointer hover:underline" @click="$router.push('/')">Sign in here!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TypeBox from '../../components/typebox.vue';
import SignButton from '../../components/signbutton.vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const role = ref('user');

function handleSignup() {
  alert(`Signed up as ${role.value}\n(You can send this to your backend later)`);
  // TODO: Send this data to backend via API call
}
</script>
