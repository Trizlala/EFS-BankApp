<template>
    <div class="px-4 py-3 max-w-6xl mx-auto sm:mt-[70px]">
        <div class="flex flex-col gap-4">
                <div class="my-4">
                    <h1 class="font-bold text-xl">User Profile</h1>
                </div>

                <div class="bg-white rounded-md w-full h-full p-2">
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

            <button
              type="submit"
              @click.prevent="saveUser"
              class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            >
              Save
            </button>

            <!--  -->
          </form>
          <!-- <span class="text-sm text-center text-red-700" v-if="errors">{{
            errorMsg.message
          }}</span> -->
          <!-- Form End  -->  
                </div>
        </div>
    </div>
</template>