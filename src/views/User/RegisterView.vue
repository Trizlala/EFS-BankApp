<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Joi from "joi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "../../firebase/firebaseInit";
import { collection, setDoc, doc } from "firebase/firestore";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const userName = ref("");
const userEmail = ref("");
const userDOB = ref("");
const phone = ref(null);
const password = ref("");
const verifyPass = ref("");

const errors = ref(false);
const errorMsg = ref("");

const schema = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(30).required(),
  lastname: Joi.string().alphanum().min(2).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: false,
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  birth_year: Joi.date(),
  phone_number: Joi.number().integer(),
});

const registerUser = async () => {
  try {
    const value = await schema.validateAsync({
      firstname: firstName.value,
      lastname: lastName.value,
      username: userName.value,
      email: userEmail.value,
      birth_year: userDOB.value,
      phone_number: phone.value,
      password: password.value,
      repeat_password: verifyPass.value,
    });
    console.log("pass");
    const firebaseAuth = await getAuth();
    const createUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      userEmail.value,
      password.value
    );
    const result = await createUser;
    const dataBase = collection(db, "users");

    await setDoc(doc(dataBase, result.user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      userEmail: userEmail.value,
      birth_year: userDOB.value,
      phone_number: phone.value,
      userId: result.user.uid,
      userAccount: [
        {
          accountId: null,
          accountType: null,
          accountBalance:null,
          accountNumber:null,
          transfers: [],
          bills: [],
          notifications: [],
        }
      ]
    });
    router.push({ name: "home" });
    return;
  } catch (err) {
    errors.value = true;
    errorMsg.value = err;
  }
};
</script>
<template>
  [url('./assets/files/Login1.jpg')]
  <div
    class="bg-gray-200 bg-cover bg-no-repeat h-full w-full"
  >
    <!-- Login Page -->
    <section class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col items-center justify-center py-[10%]">
        <div class="my-3">
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-cyan-700 group"
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
              Sign Up for <span class="font-bold">EFS Online Banking</span>
              <br />
            </h1>
          </div>
          
          <!--  -->
          <!-- Form -->
          <form class="mt-5">
            <div class="mb-6">
              <label
                for="First Name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >First Name</label
              >
              <input
                type="name"
                v-model="firstName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="Last Name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Last Name</label
              >
              <input
                type="name"
                v-model="lastName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="Username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                type="name"
                v-model="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="Email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                v-model="userEmail"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="Phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone Number</label
              >
              <input
                type="number"
                v-model="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="Date Of Birth"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Date Of Birth</label
              >
              <input
                type="date"
                v-model="userDOB"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 outline-none"
                placeholder=""
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                v-model="password"
                class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Verify Password</label
              >
              <input
                type="password"
                v-model="verifyPass"
                class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                required
              />
            </div>

            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border accent-lime-700 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-lime-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Remember User ID</label
              >
            </div>

            <button
              type="submit"
              @click.prevent="registerUser"
              class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            >
              Register
            </button>

            <!--  -->
            <div class="my-4">
              <RouterLink
                :to="{ name: 'login' }"
                class="text-cyan-700 py-2 hover:underline hover:text-cyan-600 cursor-pointer text-center"
              >
                Have Account? Sign In
              </RouterLink>

              <hr class="pb-2 mt-4" />
            </div>
            <!--  -->
          </form>
          <span class="text-sm text-center text-red-700" v-if="errors">{{
            errorMsg.message
          }}</span>
          <!-- Form End  -->
        </div>
      </div>
    </section>
    <!--  -->
  </div>
</template>
