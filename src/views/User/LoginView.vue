<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Joi from "joi";
import Spinner from '../../components/Spinner.vue'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const dropdown = ref(false);
const email = ref("");
const password = ref("");
const rememberme = ref(null);
const errors = ref(false);
const errorMsg = ref("");
const router = useRouter();
const loading = ref(false)

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const signIn = async () => {
  loading.value = true
  // const value = await schema.validateAsync({
  //   email: email.value,
  //   password: password.value,
  // });
  // console.log(value);
  const firebaseAuth = await getAuth();
  await signInWithEmailAndPassword(firebaseAuth, email.value, password.value)
    .then(() => {
      loading.value = false
      errors.value = false;
      errorMsg.value = "";
      router.push({ name: "userdashboard" });
    })
    .catch((err) => {
      errors.value = true;
      errorMsg.value = err.message.replace('Firebase:', '');
      loading.value = false
    });
};
</script>
<template>
  <Spinner v-show="loading" />
  <div
    class="bg-[url('./assets/files/login.jpg')] bg-cover bg-no-repeat min-h-screen w-full"
  >
    <!-- Login Page -->
    <section class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col items-center justify-center py-[10%]">
        <div class="my-3">
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-gray-100 group"
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
          class="w-full max-w-sm bg-white border-t-4 border-lime-700 h-full rounded-md shadow-md px-4 py-5 flex flex-col gap-3 justify-between"
        >
          <!--  -->
          <div>
            <h1 class="text-lg font-medium max-w-sm">
              Sign In to <span class="font-bold">Edge Online Banking or </span>
              <br />
              <span
                class="font-bold text-cyan-700 cursor-pointer hover:text-cyan-500 hover:underline flex items-center"
              >
                <p @click="dropdown = !dropdown" class="">
                  Select another service
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:h-6 md:w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </h1>
            <transition name="bounce">
              <ul
                class="flex flex-col gap-2 ml-5 py-3 list-disc"
                v-show="dropdown"
              >
                <li class="text-sm font-medium cursor-pointer w-fit">
                  Edge Loans
                </li>
                <li class="text-sm font-medium cursor-pointer w-fit">
                  Edge Diamond
                </li>
              </ul>
            </transition>
          </div>
          <!--  -->
          <!-- Form -->
          <form class="">
            <div class="mb-6">
              <label
                for="userId"
                class="block mb-2 text-sm font-medium text-gray-900"
                >User ID (email)</label
              >
              <input
                type="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 outline-none"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                v-model="password"
                class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5"
                required
              />
            </div>
            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  type="checkbox"
                  v-model="rememberme"
                  class="w-4 h-4 border accent-lime-700 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 outline-none"
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900"
                >Remember User ID</label
              >
            </div>
            <!--  -->
            <div class="my-4">
              <RouterLink
                :to="{ name: 'forgotpass' }"
                class="text-cyan-700 py-2 hover:underline hover:text-cyan-600 cursor-pointer"
              >
                Forget ID or Password
              </RouterLink>
            </div>
            <!--  -->
            <button
              type="submit"
              @click.prevent="signIn"
              class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none"
            >
              Login
            </button>

            <!--  -->
            <div class="my-4">
              <RouterLink
                :to="{ name: 'register' }"
                class="text-cyan-700 py-2 hover:underline hover:text-cyan-600 cursor-pointer text-center"
              >
                Enroll In Online Banking Now
              </RouterLink>

              <hr />
            </div>
            <!--  -->

            <div class="text-center text-sm text-red-700" v-if="errors">{{ errorMsg }}</div>
          </form>
          <!-- Form End  -->
        </div>
      </div>
    </section>
    <!--  -->
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
