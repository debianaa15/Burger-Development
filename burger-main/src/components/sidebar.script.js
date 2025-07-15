import { ref, computed, onMounted } from 'vue';
import newsidebar from './newsidebar.vue';

export const showCheckout = ref(false);
export const address = ref('');
export const contact = ref('');

export const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});

export const currentDate = ref('');
export const currentTime = ref('');

export function updateDateTime() {
  const now = new Date();
  currentDate.value = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  currentTime.value = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}
onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

export const subtotal = computed(() => props.cart.reduce((sum, item) => sum + item.price * item.qty, 0));
export const shippingFee = computed(() => props.cart.length > 0 ? 20 : 0);
export const total = computed(() => subtotal.value + shippingFee.value);
