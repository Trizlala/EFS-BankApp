<script setup>
import { ref, computed, onMounted, watch } from "vue";
import moment from "moment";
import { useAuthStore } from "../../stores/auth";
import { useAdminStore } from "../../stores/admin";

const authStore = useAuthStore();
const adminStore = useAdminStore()

const dateToday = moment().format(" MMMM Do YYYY");
const getHours = moment().hours();

const transfers = ref(undefined)

onMounted(async () => {
await adminStore.getRecentTransactions()
transfers.value = adminStore.recentTransactions[0][0].transfers.slice(0, 5)
})




const getText = computed(
  () =>
    "Good " +
    (getHours < 12 ? "Morning" : getHours < 18 ? "Afternoon" : "Evening")
);

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

const datas = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10]
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false
  }

  console.log("Tranfers:" + transfers.value);
</script>

<template>
  <!-- Welcome User Section Start -->
  <div>
    <!-- Body -->
    <div class="sm:mt-[100px] px-4">
      <div class="flex flex-col items-end gap-1 mt-[40px]">
        <h1 class="text-sm font-bold md:text-xl text-gray-800">
          <span class="text-sm md:text-base text-cyan-700">{{
            getText || "Welcome Back"
          }}</span>
          |
          <span
            >{{ authStore.userAuth.userFirstName }}
            {{ authStore.userAuth.userLastName }}</span
          >
        </h1>
        <h2 class="text-xs font-semibold sm:text-sm md:text-base py-2">
          {{ dateToday }}
        </h2>
      </div>

      <!-- Section 1 start -->
      <section class="py-5">
        <div
          class="flex flex-col md:flex-row md:gap-4 md:justify-center items-center"
        >
          <div
            v-for="(userData, index) in authStore.userAuth.userAccount"
            class="flex flex-col gap-1 bg-cyan-700 text-white px-2 py-4 shadow-md shadow-gray-300 rounded my-3 w-full max-w-[400px]"
          >
            <div>
              <h1 class="text-sm font-medium">
                Edge <span>{{ userData.accountType }}</span> :
                <span class="ml-1">{{ userData.accountNumber }}</span>
              </h1>
            </div>

            <div class="flex flex-col gap-1 self-end">
              <h3 class="font-bold text-2xl text-right">
                {{ formatter.format(userData.accountBalance) }}
              </h3>
              <p class="text-xs text-center">Available Balance</p>
            </div>

            <hr class="my-1" />

            <div class="flex flex-row self-end">
              <RouterLink
                :to="{ name: 'useraccount' }"
                class="text-xs bg-lime-700 p-2 md:text-base rounded font-medium"
                >View Account</RouterLink
              >
            </div>
          </div>
          <!--     
                <div
                  class="flex flex-col gap-1 bg-cyan-700 text-white px-2 py-4 shadow-md shadow-gray-300 rounded mt-[30px] w-full max-w-[400px]"
                >
                  <div>
                    <h1 class="text-sm font-medium">
                      Edge Savings: <span>E39376333</span>
                    </h1>
                  </div>
    
                  <div class="flex flex-col gap-1 self-end">
                    <h3 class="font-bold text-2xl text-right">$10,030.56</h3>
                    <p class="text-xs text-center">Available Balance</p>
                  </div>
    
                  <hr class="my-1" />
    
                  <div class="flex flex-row self-end">
                    <span class="text-xs pt-3">View Account</span>
                  </div>
                </div> -->
        </div>
      </section>
      <!-- Section 1 ends -->

      <!-- Section 2 Starts -->

      <section class="flex flex-col px-[20px] py-4 w-full">
        <div>
          <!-- Transaction History -->
          <div class="mt-4 mb-3">
            <h1 class="font-bold text-lg">Recent Transaction</h1>
          </div>



          <div v-if="transfers !== null" class="">
            <div v-for="(t, index) in transfers" class="" :key="index">
              <div class="mt-3">
                <span class="py-5 text-xs sm:text-sm font-semibold">{{ moment(t.date).format('DD-MM-YYYY') }}</span>
              </div>

              <div
                class="flex flex-row justify-between gap-1 items-center bg-gray-200 rounded-sm shadow-md px-2 py-3 w-full sm:w-[500px]"
              >
             <div class="flex items-center">
              <div
                  :class="{ 'bg-green-700' : t.credit, 'bg-red-700': !t.credit  }"
                  class="flex p-2 text-white rounded-md mr-3"
                >
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
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </div>

                <div class="flex flex-col gap-1 text-gray-800">
                  <h1 class="text-sm">{{ t.desc }}</h1>
                  <p v-if="t.credit" class="text-xs">Credit</p>
                  <p v-else class="text-xs">Debit</p>

                </div>
             </div>
                <div>
                  <span class="text-sm">{{ formatter.format(t.amount) }}</span>
                </div>
              </div>
            </div>

            <div class="mt-8 mb-5">
              <RouterLink
                class="bg-lime-700 rounded-sm text-white text-sm sm:text-base hover:bg-lime-600 p-2"
                :to="{ name: 'useraccount' }"
                >See All</RouterLink
              >
            </div>
            <!--  -->
          </div>
          <div class="" v-else>
            <p>No recent transaction on this account.</p>
          </div>

        </div>
      </section>
      <!-- Section 2 ends -->

      <!-- Section 3 starts-->
      <section class="flex flex-col px-[20px] py-4 w-full">
        <div>
          <!-- Transaction History -->
          <div class="mt-4 mb-3">
            <h1 class="font-bold text-lg">Upcoming Bills</h1>
          </div>
          <div v-if="false" class="">
            <div v-for="(rTransfer, index) in transfers" class="">
              <div class="mt-3">
                <span class="py-3">{{ rTransfer.date }}</span>
              </div>

              <div
                class="flex flex-row gap-2 items-center bg-gray-200 rounded-sm shadow-md px-2 py-3 w-full sm:w-[500px]"
              >
                <div
                  :class="{ 'bg-green-700': rTransfer.credit }"
                  class="flex bg-red-700 p-2 text-white rounded-md mr-3"
                >
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
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </div>

                <div class="flex flex-col gap-1 text-gray-800">
                  <h1 class="text-sm">{{ rTransfer.description }}</h1>
                  <p class="text-xs">{{ rTransfer.amount }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8 mb-5">
              <RouterLink
                class="bg-lime-700 rounded-sm text-white text-sm sm:text-base hover:bg-lime-600 p-2"
                :to="{ name: 'useraccount' }"
                >See All</RouterLink
              >
            </div>
            <!--  -->
          </div>
          <div class="" v-else>
            <p>No upcoming Bills on this account.</p>
          </div>

        </div>
      </section>
      <!-- Section 3 ends -->
      <!-- Section 4 starts-->
      <section class="flex flex-col px-[20px] py-4 w-full">
        <div class="flex justify-between items-center">
          <div>
            Budget Comming Soon!
          </div>
          <div>
            >
          </div>
        </div>
        <!-- <Doughnut :data="datas" :options="options" /> -->
      </section>
      <!-- Section 4 ends -->
    </div>
    <!-- Body End -->
  </div>

  <!-- Welcome End -->
</template>
