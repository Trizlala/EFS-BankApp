<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import WelcomeView from "./WelcomeView.vue";

import {
  onClickOutside,
  breakpointsTailwind,
  useBreakpoints,
} from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const smWidth = breakpointsTailwind.sm;
const sm = breakpoints.smaller("sm");
const sme = breakpoints.smallerOrEqual("sm");
const md = breakpoints.between("sm", "md");
const lg = breakpoints.between("md", "lg");
const xl = breakpoints.between("lg", "xl");
const xxl = breakpoints.between("xl", "2xl");
const xxxl = breakpoints["2xl"];

const openModal = ref(false);
const modalRef = ref(null);

onClickOutside(modalRef, (event) => {
  // console.log(event)
  openModal.value = false;
});
</script>

<template>

  <main v-if="sm || sme">
      <!-- Mobile/Tab View -->
    <div class="px-4 py-3 mx-auto max-w-6xl">
    <!-- Top -->

    <div class="flex items-center justify-between mt-2">
      <div class="flex items-center">
        <img
          class="w-6 h-6 mr-1"
          src="./../../assets/icons/logo.png"
          alt="logo"
        />
        <h1 class="font-semibold text-2xl tracking-widest text-cyan-700">
          EFS
        </h1>
      </div>

      <div class="flex flex-row gap-3 items-center" @click="openModal = true">
        <div class="relative">
          <img
            class="w-10 h-10 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="profile image"
          />
          <span
            class="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"
          ></span>
        </div>
        <div>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </div>
      <WelcomeView />
    <!--  -->

  </div>
  <!-- Mobile View End -->
  </main>


  <main class="w-full h-full bg-white">
    <!-- Desktop View -->
    <div
      v-if="md || lg || xl || xxl || xxxl"
      class="grid grid-rows-3 grid-flow-col w-full"
    >
      <!-- Grid 1 -->
      <div class="w-full h-screen row-span-3 col-span-1 overflow-auto">
        <div class="px-4 flex flex-col h-full">
          <!-- Logo -->
          <div class="my-5">
            <div class="flex items-center">
              <img
                class="w-6 h-6 mr-1"
                src="./../../assets/icons/logo.png"
                alt="logo"
              />
              <h1 class="font-semibold text-2xl tracking-widest text-cyan-700">
                EFS
              </h1>
            </div>
          </div>
          <!--  -->

          <!-- Navigation -->
          <div class="mt-2">
            <ul class="flex flex-col gap-5 font-semibold text-sm">
              <li>Home</li>
              <li>Notifications</li>
              <li>Accounts</li>
              <li>Bills</li>
              <li>Deposit Checks</li>
              <li>Online Services</li>
              <li>Manage Profile</li>
              <li>Loans/Investments</li>
            </ul>
          </div>
          <!--  -->
        </div>
      </div>
      <!-- 1 -->

      <!-- Grid 2 -->
      <div class="bg-gray-200 row-span-3 col-span-8 h-full">
          
      </div>
      <!-- 2 -->
    </div>
    <!--  -->
  </main>

  <!-- Side Nav Modal -->
  <Teleport to="body">
    <Transition name="slide-fade">
      <div
        v-if="openModal"
        class="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center"
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
                src="./../../assets/icons/logo.png"
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
              <li class="flex justify-start">
                <span>Accounts</span>
              </li>
              <hr />
              <li class="flex justify-start">
                <span>Open an Account</span>
              </li>
              <hr />
              <li class="flex justify-start">
                <span>Loans</span>
              </li>
              <hr />
              <li class="flex justify-start">
                <span>Investments</span>
              </li>
            </ul>
            <hr class="mt-3" />

            <div class="my-6 text-sm">
              <span class="font-bold text-xs">Bills</span>
              <hr class="bg-black h-[2px] mt-2" />
              <ul class="mt-4 gap-2">
                <li class="flex justify-between">
                  <span>Pay Bills</span>
                </li>
                <li class="flex justify-between">
                  <span>Transfers</span>
                </li>
                <li class="flex justify-between">
                  <span>Deposit Checks</span>
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
                  <span>Shopping</span>
                </li>
                <hr class="mt-2 mb-3" />
                <li class="flex justify-between">
                  <span>Online Service</span>
                </li>
                <hr class="mt-3" />
              </ul>
            </div>

            <div class="my-6">
              <span class="text-sm">Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  <!-- Side Nav Modal End -->
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
  transform: translateX(25px);
  opacity: 0;
}
</style>
