<script setup>

</script>

<template>
  <div class="px-4 py-3 max-w-6xl mx-auto sm:mt-[70px]">
    <div class="flex flex-col gap-4">
      <div class="my-4">
        <h1 class="font-bold text-xl py-2">Pay Bill</h1>
        <p class="text-sm max-w-[500px]">
            By paying a bill below, the bank will be using the information to pay the chosen recipient directly.
        </p>
      </div>

      <div>
        <form action="">
          <div class="flex flex-col gap-5">
            <div class="mt-3 max-w-[360px]">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Pay From</label
              >
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
              >
                <option selected value="checkings">Checkings ($777,999.00)</option>
              </select>
            </div>

            <div class="mt-3 max-w-[360px]">
              <label
                for="paymentFreq"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Payment Frequency</label
              >
              <select
                id="paymentFQ"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
              >
                <option selected>Select Payment Frequency</option>
                <option value="single">Single</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div class="mt-3 max-w-[360px]">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Pay To</label
              >
              <input
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full py-2.5 px-8 "
              />
            </div>
            <div class="mt-3 max-w-[360px] relative">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Amount</label
              >
              <input
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full py-2.5 px-8 "
              />
              <div class="absolute top-[51.5%] left-2">
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
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-3 max-w-[360px] relative flex gap-3">
                <button class="bg-lime-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-lime-600">Confirm</button>
                <button class="bg-amber-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-amber-600">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
