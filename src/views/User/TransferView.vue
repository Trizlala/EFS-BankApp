<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import Spinner from '../../components/Spinner.vue'

const authStore = useAuthStore();

const account = ref(null)
const loading = ref(false)
const modals = ref(false)
const recipientFullName = ref('')
const recipientAccountNum = ref('')
const recipientBank = ref('')
const recipientCountry = ref('')
const errStatus =  ref(false)
const errMsg = ref('')

const errStatus2 =  ref(false)
const errMsg2 = ref('')

const conTransfer = ref(false)
const payFrequency = ref(undefined)
const tfFrom = ref(undefined)
const amount =  ref(undefined)


const recipient = ref([])
const openRecipientModal = ref(false)

onMounted(async () => {
  await authStore.getCurrentUser()
  account.value = authStore.userAuth.userAccount
})


const formatter = computed(
  () =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })
);

const confirmTransfer = () => {
if (tfFrom.value !== undefined && amount.value !== undefined && recipient.length !== 0) {
  conTransfer.value = true
}
errStatus2.value = true
errMsg2.value = 'Please fill all fields!'
setTimeout(() => {
  errStatus2.value = false
errMsg2.value = ''
}, 3500);
}
const addRecipient = () => {
  openRecipientModal.value = true

}
const saveRecipient = () => {
if (recipientFullName.value.length !== 0 && recipientAccountNum.value.length !== 0 && recipientBank.value !== 0) {
  
recipient.value.push(recipientFullName.value, recipientCountry.value, recipientBank.value, recipientAccountNum.value)

openRecipientModal.value = false
}
errStatus.value = true
errMsg.value = 'Please fill all fields!'
setTimeout(() => {
  errStatus.value = false
errMsg.value = ''
}, 3500);
}

const processTx = ()=> {
  loading.value = true
  conTransfer.value = false

}
</script>

<template>
  <Spinner v-show="loading" />
  <div class="px-4 py-3 max-w-6xl mx-auto sm:mt-[70px]">
    <div class="flex flex-col gap-4">
      <div class="my-4">
        <h1 class="font-bold text-xl py-2">Transfer Money</h1>
        <p class="text-sm max-w-[500px]">
          You may transfer between your own account(s) or to another bank
          account electronically below.
        </p>
      </div>

      <div>
        <form action="">
          <div class="flex flex-col gap-5">
            <div class="mt-3 max-w-[360px]">
              <label for="paymentFrequency" class="block mb-2 text-sm font-medium text-gray-900 ">Payment Frequency</label>
              <select v-model="payFrequency"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 ">
                <option selected>Select Payment Frequency</option>
                <option value="single">Single</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div class="mt-3 max-w-[360px]">
              <label for="tfFrom" class="block mb-2 text-sm font-medium text-gray-900 ">Transfer From</label>
              <select v-model="tfFrom"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 ">
                <option selected>Choose Account</option>

                <option v-for="(a, index) in account" :key="index" :value="a.accountType">{{ a.accountType }} - {{ formatter.format(a.accountBalance) }}</option>

                <!-- <option :value=account.accountType>{{ account.accountType }} - {{ formatter.format(account.accountBalance) }}
                </option> -->
              </select>
            </div>
            <div class="mt-3 max-w-[360px] mb-5">
              <label for="tfTo" class="block mb-2 text-sm font-medium text-gray-900 ">Transfer To</label>
              <div>
                <div class="flex gap-2 items-center my-3" v-if="recipient === undefined || recipient.length == 0">
                  <svg fill="none" class="w-4 h-4" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z">
                  </path>
                </svg>
                  <button @click.prevent="addRecipient" type="button" class="text-sm">Add Recipient</button>
                </div>

                <div v-else>
                  <span  class="text-sm font-semibold text-cyan-700">Recipient: {{ recipient[0] }}</span>
                </div>
                
              </div>
            </div>
          </div>

          <div class="mt-3 max-w-[360px] relative">
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
            <input type="number"
            v-model="amount"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full py-2.5 px-8 " />
            <div class="absolute top-[51.5%] left-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div class="mt-3 max-w-[360px] relative flex gap-3 mb-8">
            <button @click.prevent="confirmTransfer"
              class="bg-lime-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-lime-600">Confirm</button>
            <button class="bg-amber-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-amber-600">Cancel</button>
          </div>
          <div v-show="errStatus2" class="mb-6">
          <span class="text-red-700 text-sm font-semibold">{{ errMsg2 }}</span>
        </div>
        </form>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="slide-fade">

      <div v-if="openRecipientModal"
        class="fixed z-50  flex inset-0 w-[300px] md:w-[500px] bg-gray-200 shadow-md rounded-md overflow-y-auto">
        <div class=" overflow-auto w-full px-4 py-3">
          <h1 class="py-4 font-bold text-lg">Add Recipient</h1>
          <div class="mb-6">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text"
            v-model="recipientFullName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Green" required>
          </div>
          <div class="mb-6">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a
              Country</label>
            <select v-model="recipientCountry"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="AU">Australia</option>
  
            </select>
          </div>
          <div class="mb-6">
            <label for="bank" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank</label>
            <input type="text"
            v-model="recipientBank"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bank" required>
          </div>
  
  
          <div class="mb-6">
            <label for="account_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account
              Number</label>
          <input type="number"
          v-model="recipientAccountNum"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Account Number" required>
        </div>
  
        <div class="mb-6 flex gap-4">
          <button @click="saveRecipient" class="text-xs sm:text-sm font-semibold text-green-700">Add</button>
          <button  @click="openRecipientModal = false" class="text-xs sm:text-sm font-semibold text-red-700">Cancel</button>
        </div>
  
        <div v-show="errStatus" class="mb-6">
          <span class="text-red-700 text-sm font-semibold">{{ errMsg }}</span>
        </div>
      </div>
    </div>
    </Transition>
</Teleport>

<!-- Confirm Transfer -->
<Teleport to="body">
<Transition name="fade-up">
  <div v-if="conTransfer" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
    <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button  @click="conTransfer = false" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You are about to transfer {{ formatter.format(amount) }} to {{ recipient[0] }}.</h3>
                <button @click="processTx" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button @click="conTransfer = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>

</Transition>

</Teleport>
<!--  -->
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


.fade-up-enter-active {
  transition: all 0.3s ease-out;
}

.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-up-enter-from,
.fade-up-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
</style>
