import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify';
import { defineStore } from 'pinia'
import { login as loginReq } from '@/services/authService'

export const useUserStore = defineStore('user', () => {
  // State
  const access_token = ref(null);

  // Getters
  const userLoggedIn = computed(() => {
    return !!access_token.value;
  })

  // Actions
  async function login(email, password) {
    try {
      const { data } = await loginReq(email, password);
      access_token.value = data?.accessToken;
    } catch (err) {
      const message = err?.response?.data?.message;
        
      toast.error(message ?? `Failed to load data. Please try again in a moment (${err?.name ?? 'Unknown'})`);
    }
  }
  
  function logout() {
    access_token.value = null;

    toast.success('You have been logged out.');
  }

  return { access_token, userLoggedIn, login, logout }
})
