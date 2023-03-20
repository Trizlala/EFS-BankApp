<script setup>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const email = ref("");
const errors = ref(false);
const errorMsg = ref("");

const resetPass = () => {
  const firebaseAuth = getAuth();
    sendPasswordResetEmail(firebaseAuth, email.value)
    .then(() => {
      errors.value =false
      errorMsg.value = ""
    })
    .catch((err) => {
      errors.value =true
      errorMsg.value = err.message
    });
};
</script>
<template>
  <div
    class="bg-[url('./assets/files/login.jpg')] bg-cover bg-no-repeat min-h-screen w-full"
  >
    <!-- Login Page -->
    <section class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col items-center justify-center py-[10%]">
        <div class="my-3">
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-white group"
            :to="{ name: 'home' }"
          >
            <img
              class="w-6 h-6 mr-1 sm:w-7 sm:h-7 lg:w-10 lg:h-10"
              src="../../assets/icons/logo.png"
              alt="logo"
            />
            <span
              class="tracking-widest text-2xl sm:text-3xl lg:text-7xl group-hover:text-cyan-600"
              >EFS</span
            >
          </RouterLink>
        </div>
        <div
          class="w-full max-w-sm bg-white h-full rounded-md shadow-md px-4 py-5 flex flex-col gap-3 justify-between"
        >
          <!--  -->
          <div>
            <h1 class="text-lg font-medium max-w-sm">
              Reset your <span class="font-bold">Online Banking Password </span>
              <br />
              <span
                class="font-bold text-cyan-700 cursor-pointer hover:text-cyan-500 hover:underline flex items-center"
                ><p>select another service</p>
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
              </span>
            </h1>
          </div>
          <!--  -->
          <!-- Form -->
          <form class="">
            <div class="mb-6">
              <label
                for="userId"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >User ID (Email)</label
              >
              <input
                type="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder="Email"
                required
              />
            </div>
            <!--  -->
            <button
              type="submit"
              @click="resetPass"
              class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            >
              Reset
            </button>

            <!--  -->
            <div class="my-4">
              <RouterLink
                :to="{ name: 'login' }"
                class="text-cyan-700 py-2 hover:underline hover:text-cyan-600 cursor-pointer text-center"
              >
                Sign In To Your Account
              </RouterLink>

              <hr />

              <div class="text-center py-3 text-red-700">{{ errorMsg }}</div>
            </div>
            <!--  -->

            <div></div>
          </form>
          <!-- Form End  -->
        </div>
      </div>
    </section>
    <!--  -->
  </div>
</template>
