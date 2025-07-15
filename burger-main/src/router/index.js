import { createRouter, createWebHistory } from 'vue-router';

import SignIn from '../assets/pages/signin.vue';
import SignUp from '../assets/pages/signup.vue';


import Landing from '../assets/pages/landing.vue';

import Menu from '../assets/pages/menu.vue';
import Checkout from '../assets/pages/checkout.vue';

const routes = [
  { path: '/', component: SignIn },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/landing', component: Landing },
  { path: '/menu', component: Menu, name: 'menu' },
  { path: '/checkout', component: Checkout, name: 'checkout' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
