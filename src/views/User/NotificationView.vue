<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();

const notification = authStore.userAuth;
const notifications = ref(null);

watch(notification, (newN) => {
  if (newN.userAccount[0].notification === []) {
    notifications.value = false
    return
  }
  notifications.value = false
});
const toggleDropdown = ref(false);
</script>

<template>
  <div class="px-4 py-3 max-w-6xl mx-auto sm:mt-[70px] h-full">
    <div class="flex flex-col gap-4 justify-center">
      <div class="my-4">
        <h1 class="font-bold text-xl">Notifications</h1>
      </div>

      <div v-if="notifications" class="">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
          <div
            class="flex items-center justify-between pb-4 flex-wrap gap-2 sm:flex-row"
          >
            <div>
              <button
                @click.prevent="toggleDropdown = !toggleDropdown"
                class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 outline-none"
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
                class="z-50 absolute top-[50px] w-48 bg-white divide-y divide-gray-100 rounded shadow"
              >
                <ul
                  class="p-3 space-y-1 text-sm text-gray-700"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-gray-100"
                    >
                      <input
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 outline-none"
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
                      class="flex items-center p-2 rounded hover:bg-gray-100"
                    >
                      <input
                        checked=""
                        id="filter-radio-example-2"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 outline-none"
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
                      class="flex items-center p-2 rounded hover:bg-gray-100"
                    >
                      <input
                        id="filter-radio-example-3"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 outline-none"
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
                      class="flex items-center p-2 rounded hover:bg-gray-100"
                    >
                      <input
                        id="filter-radio-example-4"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 outline-none"
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
                      class="flex items-center p-2 rounded hover:bg-gray-100"
                    >
                      <input
                        id="filter-radio-example-5"
                        type="radio"
                        value=""
                        name="filter-radio"
                        class="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 focus:ring-lime-500 outline-none"
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
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-lime-500 focus:border-lime-500 outline-none"
                placeholder="Search Notifications"
              />
            </div>
          </div>

          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3 sr-only">Category</th>
                <th scope="col" class="px-6 py-3 sr-only">Price</th>
                <th scope="col" class="px-6 py-3 sr-only">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{}}
                </th>
                <td class="px-6 py-4 sr-only">Sliver</td>
                <td class="px-6 py-4 sr-only">Laptop</td>
                <td class="px-6 py-4 sr-only">$2999</td>
                <td class="px-6 py-4 sr-only">
                  <a href="#" class="font-medium text-red-600 hover:underline"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <nav
            class="flex items-center justify-between pt-4 my-9"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500"
              >Showing
              <span class="font-semibold text-gray-900">0</span>
              of
              <span class="font-semibold text-gray-900">0</span></span
            >
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
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
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >1</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >2</a
                >
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 px-3 py-2 leading-tight text-lime-600 border border-lime-300 bg-lime-50 hover:bg-lime-100 hover:text-lime-700"
                  >3</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >...</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >100</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
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

      <div v-else>
        <h1 class="font-medium text-center text-lg">
          No Notification available
        </h1>
      </div>
    </div>
  </div>
</template>
