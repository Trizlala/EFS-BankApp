<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, watch, computed, onMounted } from "vue";
import Spinner from '../components/Spinner.vue'
import {
  onClickOutside,
  breakpointsTailwind,
  useBreakpoints,
} from "@vueuse/core";

// --------------------
import { getAuth } from "firebase/auth";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const firebaseAuth = getAuth();
const loading = ref(false)

const user = computed(() => {
  return authStore.userAuth.user;
});

const signOut = () => {
  firebaseAuth.signOut();
  router.push({ name: "home" });
};

onMounted(() => {
 
});


// ----------------------------------------------------------------------------------------------------------------
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
const dropdownA = ref(false);
const dropdownT = ref(false);
const dropdownB = ref(false);
const profileDropdown = ref(false);

const route = useRoute();
const router = useRouter();
onClickOutside(modalRef, (event) => {
  // console.log(event)
  openModal.value = false;
});

watch(
  () => route.name,
  async (meta) => {
    try {
      openModal.value = false;
    } catch (e) {
      console.log(e);
    }
  }
);

// single ref
const search = () => {
  console.log("Searching");
};
</script>

<template>
  <Spinner v-show="loading" />
  <main v-if="sm || sme">
    <!-- Mobile/Tab View -->
    <div class="px-4 py-3 mx-auto max-w-6xl">
      <!-- Top -->

      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center">
          <img class="w-6 h-6 mr-1" src="../assets/icons/logo.png" alt="logo" />
          <h1 class="font-semibold text-2xl tracking-widest text-cyan-700">
            EFS
          </h1>
        </div>

        <div class="flex flex-row gap-3 items-center" @click="openModal = true">
          <div
            class="flex items-center cursor-pointer justify-center h-10 w-10 rounded-full bg-gray-500 relative"
          >
            <span
              class="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"
            ></span>

            <p class="text-base font-semibold text-white text-center">
              {{ authStore.userAuth.userInitials }}
            </p>
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
      <!--  -->
    </div>
    <!-- Mobile View End -->

    <slot />
  </main>

  <main class="w-full h-full bg-gray-100 relative">
    <!-- Desktop View -->
    <div
      v-if="md || lg || xl || xxl || xxxl"
      class="flex"
    >
      <!-- Grid 1 -->
      <div class="fixed top-0 left-0 z-40 h-screen bg-white w-[190px] sm:w-[220px]">
        <div class="px-4 flex flex-col h-full">
          <!-- Logo -->
          <div class="my-5">
            <RouterLink to="#" class="flex items-center">
              <img
                class="w-6 h-6 mr-1"
                src="../assets/icons/logo.png"
                alt="logo"
              />
              <h1 class="font-semibold text-2xl tracking-widest text-cyan-700">
                EFS
              </h1>
            </RouterLink>
          </div>
          <!--  -->

          <!-- Navigation -->
          <div class="mt-2">
            <ul class="flex flex-col gap-7 font-semibold text-sm sm:text-base">
              <RouterLink
                class="cursor-pointer hover:bg-gray-100"
                :to="{ name: 'userdashboard' }"
                >Home</RouterLink
              >
              <RouterLink :to="{ name: 'usernotification' }"
                >Notifications</RouterLink
              >
              <li
                class="flex justify-between cursor-pointer items-center"
                @click.stop="dropdownA = !dropdownA"
              >
                <span>Accounts</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <ul class="flex flex-col gap-4 py-1 px-2" v-show="dropdownA">
                <RouterLink
                  @click.prevent="dropdownA = false"
                  :to="{ name: 'useraccount' }"
                  >Accounts Activity</RouterLink
                >
                <RouterLink
                  @click.prevent="dropdownA = false"
                  :to="{ name: 'userstatement' }"
                  >Monthly Statement</RouterLink
                >
              </ul>
              <li
                class="flex justify-between cursor-pointer items-center"
                @click.stop="dropdownT = !dropdownT"
              >
                <span>Transfers</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <ul class="flex flex-col gap-4 py-1 px-2" v-show="dropdownT">
                <RouterLink
                  @click.prevent="dropdownT = false"
                  :to="{ name: 'usertransfer' }"
                  >Make A Transfer</RouterLink
                >
                <RouterLink
                  @click.prevent="dropdownT = false"
                  :to="{ name: 'usertransferH' }"
                  >Transfer History</RouterLink
                >
              </ul>
              <li
                class="flex justify-between cursor-pointer items-center"
                @click.stop="dropdownB = !dropdownB"
              >
                <span>Bills</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <ul class="flex flex-col gap-4 py-1 px-2" v-show="dropdownB">
                <RouterLink
                  @click.prevent="dropdownB = false"
                  :to="{ name: 'userpaybill' }"
                  >Pay Bill</RouterLink
                >
                <RouterLink
                  @click.prevent="dropdownB = false"
                  :to="{ name: 'userpaybillH' }"
                  >Bills History</RouterLink
                >
              </ul>
              <RouterLink :to="{ name: 'userdeposit' }"
                >Deposit Checks</RouterLink
              >
              <li>Online Services</li>
              <li>Loans/Investments</li>
            </ul>
          </div>
          <!--  -->
        </div>
      </div>
      <!-- 1 -->

      <!-- Grid 2 -->
      <div class="bg-gray-100 ml-[220px] w-full h-full">
        <div class="px-4 py-3 absolute top-1 right-0">
          <div class="flex gap-4 items-center">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5"
                  placeholder="Search"
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-cyan-700 rounded-lg border border-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>

            <div
              @click="profileDropdown = !profileDropdown"
              class="relative bg-gray-700 rounded-full flex items-center justify-center h-10 w-10"
            >
              <span
                class="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"
              ></span>
              <span class="text-white font-medium text-sm">{{
                authStore.userAuth.userInitials
              }}</span>
            </div>
          </div>
          <div
            v-show="profileDropdown"
            class="absolute top-[94%] right-[0.5%] z-50"
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

                    <RouterLink :to="{ name: 'userprofile' }"
                      >Profile</RouterLink
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
        </div>
        <slot />
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

          <form class="absolute top-[70px]">
            <div class="flex flex-row-reverse items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                class="w-full px-3 border-b-2 outline-none"
                type="search"
                name="search"
                @input="search"
                placeholder="Search"
              />
            </div>
          </form>

          <!--  -->
          <div class="mt-[110px]">
            <ul class="flex flex-col gap-3 text-sm font-medium w-full">
              <li class="flex justify-start">
                <RouterLink
                  @click.prevent="openModal = false"
                  :to="{ name: 'userdashboard' }"
                  >Home</RouterLink
                >
              </li>
              <hr />
              <li class="flex justify-start">
                <RouterLink
                  @click.prevent="openModal = false"
                  :to="{ name: 'usernotification' }"
                  >Notifications</RouterLink
                >
              </li>
              <hr />
              <li
                @click.stop="dropdownA = !dropdownA"
                class="flex justify-between items-center cursor-pointer"
              >
                <span>Accounts</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <div v-show="dropdownA">
                <ul class="flex flex-col gap-2 mt-1 px-4">
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'useraccount' }"
                    >Accounts Activity</RouterLink
                  >
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'userstatement' }"
                    >Monthly Statement</RouterLink
                  >
                </ul>
              </div>
              <hr />

              <li
                @click.stop="dropdownT = !dropdownT"
                class="flex justify-between cursor-pointer"
              >
                <span>Transfers</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <div v-show="dropdownT">
                <ul class="flex flex-col gap-2 mt-1 px-4">
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'usertransfer' }"
                    >Make A Transfer</RouterLink
                  >
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'usertransferH' }"
                    >Transfer History</RouterLink
                  >
                </ul>
              </div>
              <hr class="" />
              <li
                @click.stop="dropdownB = !dropdownB"
                class="flex justify-between cursor-pointer"
              >
                <span>Bills</span>
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </li>
              <div v-show="dropdownB">
                <ul class="flex flex-col gap-2 mt-1 px-4">
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'userpaybill' }"
                    >Pay Bill</RouterLink
                  >
                  <RouterLink
                    @click.prevent="openModal = false"
                    :to="{ name: 'userpaybillH' }"
                    >Bills History</RouterLink
                  >
                </ul>
              </div>
            </ul>
            <hr class="mt-3" />

            <ul class="mt-4 flex flex-col gap-4 text-sm font-medium">
              <RouterLink
                @click.prevent="openModal = false"
                :to="{ name: 'userdeposit' }"
                >Deposit Checks</RouterLink
              >
              <li>Loans/Investments</li>
              <li>Budgets</li>
              <li>Online Services</li>
              <RouterLink
                @click.prevent="openModal = false"
                :to="{ name: 'userprofile' }"
                >Manage Profile</RouterLink
              >
              <li
                @click.prevent="signOut"
                class="mt-7 bg-lime-700 rounded text-white text-sm sm:text-base px-2 py-1 w-fit cursor-pointer"
              >
                Sign Out
              </li>
            </ul>
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
