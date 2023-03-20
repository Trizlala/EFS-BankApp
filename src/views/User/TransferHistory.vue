<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAdminStore } from "../../stores/admin";

const toggleDropdown = ref(false)

const authStore = useAuthStore();

const adminStore = useAdminStore()

const transfers = ref(undefined)

onMounted(async () => {
await adminStore.getRecentTransactions()
transfers.value = adminStore.recentTransactions[0][0].transfers
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

</script>
<template>
  <div class="px-4 py-3 max-w-6xl mx-auto sm:mt-[70px] h-full">
    <div class="flex flex-col gap-4">
      <div class="my-4">
        <h1 class="font-bold text-xl">Transfer History</h1>
      </div>

      <div v-if="true">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
          <div class="flex items-center justify-between pb-4 flex-wrap gap-3">
            <div>
              <button
              @click.prevent="toggleDropdown = !toggleDropdown"
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                type="button"
              >
                <svg
                  class="w-4 h-4 mr-2 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Last 30 days
                <svg
                  class="w-3 h-3 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <!-- Dropdown menu -->
              <div
              v-show="toggleDropdown"
                id="dropdownRadio"
                class="z-50 w-48 absolute top-[50px] bg-white divide-y divide-gray-100 rounded shadow " 
              >
                <ul
                  class="p-3 space-y-1 text-sm text-gray-700 "
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100 "
                    >
                      <input
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 "
                      />
                      <label
                        for="filter-radio-example-1"
                        class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >Last day</label
                      >
                    </div>
                  </li>
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100 "
                    >
                      <input
                        checked=""
                        id="filter-radio-example-2"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 "
                      />
                      <label
                        for="filter-radio-example-2"
                        class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >Last 7 days</label
                      >
                    </div>
                  </li>
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100 "
                    >
                      <input
                        id="filter-radio-example-3"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 "
                      />
                      <label
                        for="filter-radio-example-3"
                        class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >Last 30 days</label
                      >
                    </div>
                  </li>
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100 "
                    >
                      <input
                        id="filter-radio-example-4"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 "
                      />
                      <label
                        for="filter-radio-example-4"
                        class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >Last month</label
                      >
                    </div>
                  </li>
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100 "
                    >
                      <input
                        id="filter-radio-example-5"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 "
                      />
                      <label
                        for="filter-radio-example-5"
                        class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >Last year</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500"
                  aria-hidden="true"
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
                id="table-search"
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-lime-500 focus:border-lime-500 outline-none "
                placeholder="Search Account Activity"
              />
            </div>
          </div>
          <table
            class="w-full text-sm text-left text-gray-500"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 "
            >
              <tr>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Amount</th>
                <th scope="col" class="px-6 py-3">Balance</th>
                <th scope="col" class="px-6 py-3">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr
              v-for="(t, index) in transfers " :key="index"
                class="bg-white border-b hover:bg-gray-50 "
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {{ index + 1 }}
                </th>
                <td class="px-6 py-4">{{t.date }}</td>
                <td class="px-6 py-4">{{t.desc  }}</td>
                <td v-if="t.credit" class="px-6 py-4 text-green-900"> + {{ formatter.format(t.amount) }}</td>
                <td v-else class="px-6 py-4 text-red-900"> - {{ formatter.format(t.amount) }}</td>

                <td class="px-6 py-4">{{ formatter.format(t.accountBalance )}}</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-cyan-700  hover:underline"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <nav
            class="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500"
              >Showing
              <span class="font-semibold text-gray-900 ">1</span>
              of
              <span class="font-semibold text-gray-900 "
                >1</span
              ></span
            >
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >1</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >2</a
                >
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 px-3 py-2 leading-tight text-lime-600 border border-lime-300 bg-lime-50 hover:bg-lime-100 hover:text-lime-700 "
                  >3</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >...</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >100</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

  
      <div class="h-screen" v-else>
          <h1 class="font-medium text-center text-lg">No Transfers available</h1>
      </div>
    </div>
  </div>
</template>
