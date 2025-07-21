<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-neutral-50 py-8">
    <div class="w-full max-w-[952px] bg-white rounded-lg shadow-xl outline outline-[0.75px] outline-offset-[-0.75px] outline-gray-200 overflow-hidden p-6 md:p-12 flex flex-col items-center">
      <img
        src="/images/logo.png"
        alt="Logo"
        class="w-40 h-40 md:w-64 md:h-64 object-contain mb-2 mx-auto"
      />
      <h2 class="text-amber-950 text-3xl font-semibold font-['Poppins'] font-poppins mb-8 text-center w-full">Sign In</h2>

      <form class="w-full max-w-md flex flex-col gap-4 mx-auto" @submit.prevent="login">
        <div class="w-full flex flex-col items-center">
          <div class="w-80">
            <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div class="w-full flex flex-col items-center">
          <div class="w-80">
            <label class="block text-amber-950 text-lg font-medium font-['Inter'] mb-2 text-left">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div class="mt-4 w-full flex justify-center">
          <button type="submit" class="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded font-semibold">
            Sign In
          </button>
        </div>
      </form>

      <p v-if="error" class="text-red-600 mt-4 text-sm font-poppins">{{ error }}</p>

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

<script>
import { users } from '../../data/users.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      const user = users.find(
        u => u.email === this.email && u.password === this.password
      );

      if (user) {
        if (user.role === 'admin') {
          this.$router.push('/admin');
        } else if (user.role === 'staff') {
          this.$router.push('/staff');
        } else {
          this.$router.push('/menu');
        }
      } else {
        this.error = 'Invalid email or password.';
      }
    },
    goToSignup() {
      this.$router.push('/signup');
    }
  }
};
</script>
