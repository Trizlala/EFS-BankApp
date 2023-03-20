<script setup lang="ts">
import AppLayoutDefault from "./AppLayoutDefault.vue";
import { markRaw, ref, watch} from "vue";
import { useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const firebaseAuth = getAuth();

const layout = ref();
const route = useRoute();


onAuthStateChanged(firebaseAuth, (user)=> {
  authStore.updateUser(user)
  
  if (user) {
    authStore.getCurrentUser()
    
  }
})

//console.log(authStore.userAuth.user);

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(/* @vite-ignore */ `../layouts/${metaLayout}.vue`));
      layout.value = markRaw(component?.default || AppLayoutDefault);
      
    } catch (e) {
      layout.value = markRaw(AppLayoutDefault);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template>
