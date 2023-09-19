import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useCookies } from 'vue3-cookies'
import { defineStore } from 'pinia'
import { login as loginReq, logout as logoutReq, refresh as refreshReq } from '@/services/authService'

export const useUserStore = defineStore('user', () => {
  const { cookies } = useCookies();

  // State
  const userLoggedIn = ref(cookies.isKey('accessToken'))

  // Getters
  // ...

  // Actions
  async function login(email, password) {
    try {
      const { data } = await loginReq(email, password);
      const token = data?.accessToken ?? ''; 
      
      cookies.set('accessToken', token, '10s');
      userLoggedIn.value = true;
    } catch (err) {
      const message = err?.response?.data?.message;
        
      toast.error(message ?? `Failed to load data. Please try again in a moment (${err?.name ?? 'Unknown'})`);
    }
  }

  async function logout(silent = false) {
    try {
      await logoutReq();
      
      cookies.remove('accessToken');
      userLoggedIn.value = false;
      
      if(!silent)
        toast.success('You have been logged out.');
    } catch(err) {
      const message = err?.response?.data?.message;
      toast.error(message  ?? `Failed to logout (${err?.name ?? 'Unknown'})`);
    }
  }

  async function refresh() {
    try {
      const { data } = await refreshReq();
      const token = data?.accessToken; 
      
      if (token) {
        cookies.set('accessToken', token, '15min');
        userLoggedIn.value = true;
      }
    } catch(err) {
      logout(true)
    }
  }

  return { userLoggedIn, login, logout, refresh }
})
