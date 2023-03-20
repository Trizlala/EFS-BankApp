<template>
  <div class="px-4 py-3 max-w-6xl mx-auto">
    <div class="flex flex-col gap-4">
      <div class="my-4">
        <h1 class="font-bold text-xl py-2">Deposit Checks</h1>
        <p class="text-sm max-w-[500px]">
          You may deposit checks below by taking a clear picture of the front
          and back of the check with a solid background. Be sure to endorse
          (sign) the back of your check first!
        </p>
      </div>

      <div>
        <form action="">
          <div class="flex flex-col gap-5">
            <div class="mt-3 max-w-[360px]">
              <label for="" class="block mb-2 text-sm font-medium text-gray-900"
                >To</label
              >
              <input
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full py-2.5 px-8"
              />
            </div>
            <div class="mt-3 max-w-[360px] relative">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Amount</label
              >
              <input
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-lime-500 focus:border-lime-500 block w-full py-2.5 px-8"
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

            <div class="mt-3 max-w-[360px] relative">
                <label for="upload" class="block mb-2 text-sm font-medium text-gray-900"
                >Upload Check</label
              >
              <div class="flex flex-col gap-3">
                <input class="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " type="file">
                <input class="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " type="file">
              </div>
            </div>
            <div class="mt-3 max-w-[360px] relative flex gap-3">
              <button
                class="bg-lime-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-lime-600"
              >
                Confirm
              </button>
              <button
                class="bg-amber-700 px-3 py-1.5 text-white font-medium rounded-sm hover:bg-amber-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
