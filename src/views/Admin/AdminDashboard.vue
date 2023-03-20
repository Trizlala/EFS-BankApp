<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from "../../stores/admin";

const adminStore = useAdminStore();
const userdata = ref(null)

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

onMounted(async () => {
await adminStore.getAllUser()
})

userdata.value = adminStore.users.user

console.log(userdata.value);
</script>


<template>

<div class="max-w-7xl mx-auto px-4 py-3 mt-4 md:mt-6">
    <div class="my-3">
        <h1 class="font-bold text-xl md:text-3xl">Admin Dashboard</h1>
    </div>

    <div class="mt-6">
        
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    User
                </th>
                <th scope="col" class="px-6 py-3">
                    Account Balance
                </th>
                <th scope="col" class="px-6 py-3">
                    Account Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Account Type
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, i) in userdata" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ user.firstName }} {{ user.lastName }}
                </th>
                <td class="px-6 py-4">
                    <span class="flex items-center gap-2" v-for="(un, index) in user.userAccount">
                        {{ formatter.format(un.accountBalance)}}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="flex items-center gap-2" v-for="(ua, index) in user.userAccount">
                        {{ ua.accountNumber}}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="flex items-center gap-2" v-for="(uat, index) in user.userAccount">
                        {{ uat.accountType }}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </div>
</div>
</template>