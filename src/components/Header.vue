<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";

import { onClickOutside } from "@vueuse/core";
import { getAuth } from "firebase/auth";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const firebaseAuth = getAuth();

const openModal = ref(false);

const modalRef = ref(null);
const profileDropdown = ref(false);

onClickOutside(modalRef, (event) => {
  // console.log(event)
  openModal.value = false;
});

const user = computed(() => {
  return authStore.userAuth.user;
});

const signOut = () => {
  firebaseAuth.signOut();
  window.location.reload();
};
</script>
<template>
  <header
    class="bg-slate-100 text-slate-800 p-4 w-full h-full shadow-lg shadow-white relative"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Mobile View -->
      <nav
        class="flex flex-row gap-3 justify-between items-center flex-wrap lg:hidden"
      >
        <div @click="openModal = true" class="">
          <svg
            class="w-6 h-6 sm:h-7 sm:w-7 text-slate-800 stroke-cyan-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>

        <div class="">
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-cyan-700 group"
            :to="{ name: 'home' }"
          >
            <img
              class="w-6 h-6 mr-1 sm:w-7 sm:h-7"
              src="../assets/icons/logo.png"
              alt="logo"
            />
            <span
              class="tracking-widest text-2xl sm:text-3xl group-hover:text-cyan-600"
              >EFS</span
            >
          </RouterLink>
        </div>

        <div class="flex items-center justify-between gap-3">
          <RouterLink
            v-if="!user"
            :to="{ name: 'login' }"
            class="bg-lime-700 text-slate-100 p-2 rounded-[4px] font-medium text-sm sm:text-base md:text-lg hover:bg-lime-600 transition-colors ease-linear duration-150"
            >Sign In</RouterLink
          >

          <div class="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          <div
            v-if="user"
            @click="profileDropdown = !profileDropdown"
            class="flex items-center cursor-pointer justify-center h-10 w-10 rounded-full bg-gray-500"
          >
            <p class="text-base font-semibold text-white text-center">
              {{ authStore.userAuth.userInitials }}
            </p>
          </div>
        </div>
        <div
          v-if="profileDropdown"
          class="absolute top-[94%] right-[0.5%] z-40"
        >
          <div
            class="flex flex-col gap-2 justify-between rounded-sm bg-gray-500"
          >
            <div class="flex flex-row items-center gap-4 px-2">
              <div
                class="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center"
              >
                <span>{{ authStore.userAuth.userInitials }}</span>
              </div>
              <div
                class="flex flex-col gap-1 text-xs font-medium text-white mt-3"
              >
                <h2>
                  {{ authStore.userAuth.userFirstName }}
                  {{ authStore.userAuth.userLastName }}
                </h2>
                <span>{{ authStore.userAuth.userName }}</span>
                <span> {{ authStore.userAuth.userEmail }}</span>
              </div>
            </div>

            <hr />
            <div class="p-2 text-white">
              <ul class="flex gap-2 flex-col font-medium text-sm">
                <li class="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <RouterLink :to="{ name: 'userdashboard' }"
                    >Dashboard</RouterLink
                  >
                </li>
                <li class="flex items-center gap-3" @click="signOut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>

                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <!-- Mobile View End -->

      <!-- Desktop View -->
      <nav class="lg:flex flex-col gap-3 hidden">
        <div
          class="lg:flex flex-row gap-3 justify-between items-center flex-wrap"
        >
          <div class="">
            <ul class="flex space-x-5 text-sm font-medium">
              <li>Persornal</li>
              <li>Small Business</li>
              <li>Coporate & Institutional</li>
            </ul>
          </div>

          <div class="flex gap-3 items-center">
            <ul class="flex space-x-4 text-sm font-medium">
              <li>Schedule a Meeting</li>
              <li>Customer Service</li>
              <li>Español</li>
            </ul>

            <div class="sr-only">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Logo -->
        <div>
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-cyan-700 group"
            :to="{ name: 'home' }"
          >
            <img
              class="w-6 h-6 mr-1 sm:w-7 sm:h-7"
              src="../assets/icons/logo.png"
              alt="logo"
            />
            <span
              class="tracking-widest text-2xl sm:text-3xl group-hover:text-cyan-600"
              >EFS</span
            >
          </RouterLink>
        </div>
        <!--  -->

        <!--  -->

        <div class="flex flex-row gap-3 justify-between items-center">
          <div class="text-sm font-medium">
            <ul class="flex flex-row gap-6 items-center">
              <li>Products & Services</li>
              <li>Learning</li>
              <li>Support</li>
              <li>Offers</li>
            </ul>
          </div>

          <div>
            <ul class="flex flex-row gap-7 items-center">
              <li class="flex flex-row gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <span>Search</span>
              </li>

              <li class="flex justify-between, gap-2">
                <RouterLink
                  v-if="!user"
                  :to="{ name: 'login' }"
                  class="bg-lime-700 text-slate-100 p-2 rounded-[4px] font-medium text-sm sm:text-base md:text-lg hover:bg-lime-600 transition-colors ease-linear duration-150"
                  >Sign In</RouterLink
                >

                <div
                  v-if="user"
                  @click="profileDropdown = !profileDropdown"
                  class="flex cursor-pointer items-center justify-center h-10 w-10 rounded-full bg-gray-500"
                >
                  <p class="text-base font-semibold text-white text-center">
                    <span>{{ authStore.userAuth.userInitials }}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="profileDropdown"
          class="absolute top-[94%] right-[0.5%] z-40"
        >
          <div
            class="flex flex-col gap-2 justify-between rounded-sm bg-gray-500"
          >
            <div class="flex flex-row items-center gap-4 px-2">
              <div
                class="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center"
              >
                <span>{{ authStore.userAuth.userInitials }}</span>
              </div>
              <div
                class="flex flex-col gap-1 text-xs font-medium text-white mt-3"
              >
                <h2>
                  {{ authStore.userAuth.userFirstName }}
                  {{ authStore.userAuth.userLastName }}
                </h2>
                <span>{{ authStore.userAuth.userName }}</span>
                <span> {{ authStore.userAuth.userEmail }}</span>
              </div>
            </div>

            <hr />
            <div class="p-2 text-white">
              <ul class="flex gap-2 flex-col font-medium text-sm">
                <li class="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <RouterLink :to="{ name: 'userdashboard' }"
                    >Dashboard</RouterLink
                  >
                </li>
                <li class="flex items-center gap-3" @click="signOut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>

                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!--  -->
      </nav>
      <!-- Desktop View End -->
    </div>
    <!-- Side Nav Modal -->
    <Transition name="slide-fade">
      <div
        v-if="openModal"
        class="fixed top-0 inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center"
        tabindex="-1"
      >
        <div
          ref="modalRef"
          class="relative overflow-auto p-6 bg-white rounded-br-md shadow-xl h-[100%] w-[82%] sm:max-w-[60%] max-w-3xl"
        >
          <div class="absolute top-3 left-2 pl-4">
            <div class="flex items-center">
              <img
                class="w-6 h-6 mr-1"
                src="../assets/icons/logo.png"
                alt="logo"
              />
              <h1 class="font-semibold text-2xl tracking-widest text-cyan-700">
                EFS
              </h1>
            </div>
          </div>
          <button @click="openModal = false" class="absolute top-0 right-0 p-4">
            <svg
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <!-- Search bar -->

          <div class="absolute top-[70px]">
            <div class="flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <h2 class="pl-2">Search</h2>
            </div>
          </div>

          <!--  -->
          <div class="mt-[90px]">
            <ul class="flex flex-col gap-3 text-sm">
              <li class="flex justify-between">
                <span>Checkings & Savings</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <hr />
              <li class="flex justify-between">
                <span>Credit Cards</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <hr />
              <li class="flex justify-between">
                <span>Car Loans</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <hr />
              <li class="flex justify-between">
                <span>Home Loans</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <hr />
              <li class="flex justify-between">
                <span>Investing</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <hr />
              <li class="flex justify-between">
                <span>Education and Travels</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
            </ul>
            <hr />

            <div class="my-6 text-sm">
              <span class="font-bold text-xs">Connect with us</span>
              <hr class="bg-black h-[2px] mt-2" />
              <ul class="mt-4 gap-2">
                <li class="flex justify-between">
                  <span>Schedule a Meeting</span>
                </li>
                <hr class="mt-2 mb-3" />
                <li class="flex justify-between">
                  <span>Customer Service</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </li>
                <hr />
              </ul>
            </div>

            <div class="my-6 text-sm">
              <span class="font-bold text-xs">Other Products</span>
              <hr class="bg-black h-[2px] mt-2" />
              <ul class="mt-4 gap-2">
                <li class="flex justify-between">
                  <span>Commercial</span>
                </li>
                <hr class="mt-2 mb-3" />
                <li class="flex justify-between">
                  <span>Customer Service</span>
                </li>
                <hr class="mt-3" />
              </ul>
            </div>

            <div class="my-6">
              <span class="text-sm">Español</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Side Nav Modal End -->
  </header>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-25px);
  opacity: 0;
}
</style>
