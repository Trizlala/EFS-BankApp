<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import MultiStepForm from "../../components/MultiStepForm.vue";
import Joi from "joi";
import { useCitiesStore } from "../../stores/cities";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "../../firebase/firebaseInit";
import { collection, setDoc, doc } from "firebase/firestore";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const userName = ref("");
const userEmail = ref("");
const userDOB = ref("");
const userPhone = ref(null);
const password = ref("");
const verifyPass = ref("");
const state = ref([]);
const cities = ref([]);
const userState = ref("Choose a State");
const userCity = ref("Choose a City");
const userAddress = ref("");
const userZip = ref(null);

const show = ref(false)

const useStates = useCitiesStore();

const s = () => {
  for (var key in useStates.data) {
    if (useStates.data.hasOwnProperty(key)) {
      state.value.push(key);
    }
  }
};
const c = () => {
  for (var key in useStates.data) {
    if (useStates.data.hasOwnProperty(key)) {
      cities.value.push(useStates.data[key]);
    }
  }
};

s();
c();

const multiStepForm = ref(null);

// single ref
watch(userState, (newState) => {
  userState.value = newState;
  cities.value = useStates.data[newState];
});

const errors = ref(false);
const errorMsg = ref("");

const schema1 = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(30).required(),
  lastname: Joi.string().alphanum().min(2).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});
const schema2 = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: false,
  }),
  userPhone: Joi.number().greater(12).integer().required(),
  userDOB: Joi.string().required(),
  userAddress: Joi.string(),
});
const schema3 = Joi.object({
  userState: Joi.string().required(),
  userCity: Joi.string().required(),
  Zip: Joi.number().max(99999).required(),
});

const steps = ref([
  { step_no: 1, step_valid: false },
  { step_no: 2, step_valid: false },
  { step_no: 3, step_valid: false },
]);

const submitForm = async () => {
show.value = true

  const firebaseAuth = await getAuth();
  const createUser = await createUserWithEmailAndPassword(
    firebaseAuth,
    userEmail.value,
    password.value
  );

  const result = await createUser;
  const dataBase = collection(db, "users");

  const randomNumber = computed(() => {
    return Math.floor(Math.random() * 100000000);
  });

  await setDoc(doc(dataBase, result.user.uid), {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    userEmail: userEmail.value,
    birth_year: userDOB.value,
    phone_number: userPhone.value,
    userAddress: userAddress.value,
    userCity: userCity.value,
    userState: userState.value,
    userZip: userZip.value,
    userId: result.user.uid,
    userAccount: [
      {
        accountId: null,
        accountType: "Checkings",
        accountBalance: 0,
        accountNumber: randomNumber.value,
        transfers: [],
        bills: [],
        notifications: [],
      },
    ],
  });
  router.push({ name: "home" });
  return;
};

const validate = async (stepIndex) => {
  console.log(stepIndex);
  console.log(steps.value[stepIndex].step_valid);

  switch (stepIndex) {
    case 0:
      try {
        const { error, value } = await schema1.validateAsync({
          firstname: firstName.value,
          lastname: lastName.value,
          username: userName.value,
          password: password.value,
          repeat_password: verifyPass.value,
        });
        steps.value[stepIndex].step_valid = true;
        multiStepForm.value.submitStep();
      } catch (err) {
        errors.value = true;
        errorMsg.value = err.message.replace('"', ' ');
        steps.value[stepIndex].step_valid = false;
        setTimeout(() => {
          errors.value = false;
          errorMsg.value = "";
        }, 3000);
      }

      break;
    case 1: // Value of foo matches this criteria; execution starts from here
      try {
        const { error, value } = await schema2.validateAsync({
          email: userEmail.value,
          userAddress: userAddress.value,
          userDOB: userDOB.value,
          userPhone: userPhone.value,
        });
        steps.value[stepIndex].step_valid = true;
        multiStepForm.value.submitStep();
      } catch (err) {
        errors.value = true;
        errorMsg.value = err;
        steps.value[stepIndex].step_valid = false;
        setTimeout(() => {
          errors.value = false;
          errorMsg.value = "";
        }, 3000);
      }
      break;

    // Forgotten break! Execution falls through
    case 2: // no break statement in 'case 0:' so this case will run as well
      try {
        const { error, value } = await schema3.validateAsync({
          userState: userState.value,
          userCity: userCity.value,
          Zip: userZip.value,
        });
        steps.value[stepIndex].step_valid = true;
        multiStepForm.value.submitStep();
      } catch (err) {
        errors.value = true;
        errorMsg.value = err;
        steps.value[stepIndex].step_valid = false;
        setTimeout(() => {
          errors.value = false;
          errorMsg.value = "";
        }, 3000);
      }
      break; // Break encountered; will not continue into 'case 2:'
    default:
      console.log("default");
  }
};
</script>
<template>
  <MultiStepForm
    @onComplete="submitForm"
    @validateStep="validate"
    ref="multiStepForm"
    :steps="steps"
    v-show="show"
  >
    <template #header>
      <div>
        <h1 class="text-lg font-medium max-w-sm">
          Sign Up for <span class="font-bold">EFS Online Banking</span>
          <br />
        </h1>
      </div>
    </template>
    <template #footer>
      <span class="text-sm text-center text-red-700" v-if="errors">{{
        errorMsg
      }}</span>
    </template>
    <template #step1>
          <div class="mb-6 mt-6">
            <label
              for="First Name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >First Name</label
            >
            <input
              type="name"
              v-model="firstName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
              placeholder=""
            />
          </div>
    
          <div class="mb-6">
            <label
              for="Last Name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Last Name</label
            >
            <input
              type="name"
              v-model="lastName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
              placeholder=""
            />
          </div>
          <div class="mb-6">
            <label
              for="userName"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Username</label
            >
            <input
              type="name"
              v-model="userName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
              placeholder=""
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
              class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
            />
          </div>
    
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Verify Password</label
            >
            <input
              type="password"
              v-model="verifyPass"
              class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
            />
          </div>
        </template>
    <template #step2>
      <div class="my-6">
        <label
          for="Phone"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Phone Number</label
        >
        <input
          type="number"
          v-model="userPhone"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
          placeholder=""
        />
      </div>

      <div class="mb-6">
        <label
          for="Date Of Birth"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Email</label
        >
        <input
          type="email"
          v-model="userEmail"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
          placeholder=""
        />
      </div>

      <div class="mb-6">
        <label
          for="Date Of Birth"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Date Of Birth</label
        >
        <input
          type="date"
          v-model="userDOB"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
          placeholder=""
        />
      </div>
      <div class="mb-6">
        <label
          for="address"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Address</label
        >
        <input
          type="text"
          v-model="userAddress"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
          placeholder=""
        />
      </div>
    </template>
    <template #step3>
      <div class="my-6">
        <label
          for="userState"
          class="block mb-2 text-sm font-medium text-gray-900"
          >State</label
        >
        <select
          v-model="userState"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5
          "
        >
          <option selected>Choose a State</option>
          <option v-for="(state, index) in state" :key="index" :value="state">
            {{ state }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label
          for="city"
          class="block mb-2 text-sm font-medium text-gray-900"
          >City</label
        >
        <select
          v-model="userCity"
          id="cities"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5"
        >
          <option selected>Choose a city</option>
          <option v-for="(city, index) in cities" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label
          for="Zip"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Zip</label
        >
        <input
          type="number"
          v-model="userZip"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5  outline-none"
          placeholder=""
        />
      </div>
      <div class="flex items-start mb-5 mt-4">
        <div class="flex items-center h-5">
          <input
            type="checkbox"
            value=""
            class="w-4 h-4 border accent-lime-700 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 "
          />
        </div>
        <label
          for="remember"
          class="ml-2 text-sm font-medium text-gray-900"
          >I agree to terms and conditions</label
        >
      </div>
    </template>
  </MultiStepForm>
</template>


<style scoped>

</style>
