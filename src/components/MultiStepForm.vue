<script setup>
import { ref } from "vue";
import Spinner from "./Spinner.vue"
const props = defineProps(["steps"]);
const emit = defineEmits(["onComplete", "validateStep"]);
const loading = ref(false)

const activeStepIndex = ref(0);
const stepButton = ref("Next");

const submitStep = () => {
  if (props.steps[activeStepIndex.value].step_valid === true) {
    activeStepIndex.value++;
  } else {
    emit("validateStep", activeStepIndex.value);
  }

  if (activeStepIndex.value === props.steps.length - 1) {
    stepButton.value = "Register";
    return false;
  }
  if (activeStepIndex.value === props.steps.length) {
    loading.value = true
    emit("onComplete");
    return false;
  }
};

defineExpose({
  submitStep,
});
</script>

<template>
  <Spinner v-if="loading" />
  <div
    class="bg-[url('./assets/files/login.jpg')] bg-cover bg-no-repeat h-full w-full"
  >
    <!-- Login Page -->
    <section class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col items-center justify-center py-[10%]">
        <div class="my-3">
          <RouterLink
            class="font-semibold text-xl tracking-widest flex items-center text-gray-100 group"
            :to="{ name: 'home' }"
          >
            <img
              class="w-6 h-6 mr-1 sm:w-7 sm:h-7 lg:w-10 lg:h-10"
              src="../assets/icons/logo.png"
              alt="logo"
            />
            <span
              class="tracking-widest text-2xl sm:text-3xl lg:text-7xl group-hover:text-cyan-600"
              >EFS</span
            >
          </RouterLink>
        </div>

        <!--  -->
        <Transition>

          <div
            class="w-full max-w-sm bg-white h-full rounded-md shadow-md px-4 py-5 flex flex-col gap-3 justify-between"
          >
            <form class="mt-5" @submit.prevent="submitStep">
              <slot name="header" />
              <div
                v-for="(step, index) in steps"
                :key="index"
                v-show="activeStepIndex === index"
              >
                <slot :name="'step' + (index + 1)" />
              </div>
              <div  class="flex flex-col gap-2">
                <button
                  class="mb-4 text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
                  type="submit"
                >
                  {{ stepButton }}
                </button>
              </div>
            </form>
            <slot name="footer" />
            <!--  -->
            <div class="my-1">
              <RouterLink
                :to="{ name: 'login' }"
                class="text-cyan-700 py-2 hover:underline hover:text-cyan-600 cursor-pointer text-center"
              >
                Have Account? Sign In
              </RouterLink>
  
              <hr class="pb-2 mt-4" />
            </div>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>


<style scoped> 
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
