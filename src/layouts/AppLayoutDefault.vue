<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";


// ---------------------------------------------------------

const navigation = ref(null);
const route = useRoute();

const checkRoute = () => {
  if (route.name === "userdashboard" || route.name === "login" || route.name === "register" || route.name === "forgotpass")  {
    navigation.value = true;
    return;
  }
  navigation.value = false;
};

checkRoute();

watch(
  () => route.name,
  () => {
    checkRoute();
    // Do something here...

    // Optionally you can set immediate: true config for the watcher to run on init
    //}, { immediate: true });
  }
);
</script>


<template>
  <div class="antialiased box-border scroll-smooth min-h-full">
    <Header v-if="!navigation" />
    <slot />
    <Footer v-if="!navigation" />
    </div>
  </template>