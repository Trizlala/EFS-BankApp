<script setup>
import { ref } from "vue";

// Carousel
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RouterLink } from "vue-router";

const onSwiper = (swiper) => {
  console.log("Swiper Active");
};
const onSlideChange = () => {
  console.log("Slide Changed");
};

let modules = ref([Navigation, Pagination]);

const chwrfu = ref([
  {
    text: "Business",
    icon: "brifecase.png",
  },
  {
    text: "Credit Cards",
    icon: "cc.png",
  },
  {
    text: "Checking",
    icon: "cheque.png",
  },
  {
    text: "Savings",
    icon: "wallet.png",
  },
  {
    text: "Home Loans",
    icon: "home.png",
  },
  {
    text: "Auto",
    icon: "car.png",
  },
  {
    text: "Investments",
    icon: "growth.png",
  },
  {
    text: "Commercial",
    icon: "building.png",
  },
  {
    text: "Scedule a metting",
    icon: "appointment-scheduling.png",
  },
  {
    text: "Free Credit Score",
    icon: "speed.png",
  },
]);

const nands = ref([
  {
    heading: "",
    text: "Deciphering the language of your real estate agent and seller.",
    icon: "realestate.jpg",
  },
  {
    heading: "",
    text: "Discover the elements that affect your credit rating.",
    icon: "credit-score.jpg",
  },
  {
    heading: "",
    text: "Become a savvy shopper: 5 tips for securing exactly what you desire.",
    icon: "shopping.jpg",
  },
  {
    heading: "",
    text: "Weighing the pros and cons of renovating versus relocating.",
    icon: "relocating.jpg",
  },
  {
    heading: "",
    text: "Urban living or suburban comfort: deciding where to put down roots.",
    icon: "urban.jpg",
  },
  {
    heading: "",
    text: "Evaluating the benefits of switching to an electric vehicle.",
    icon: "electriccar.jpg",
  },
  {
    heading: "",
    text: "Introducing art to children during difficult times",
    icon: "artchildren.jpg",
  },
  {
    heading: "",
    text: "Videos to help you bank from your device.",
    icon: "tips.jpg",
  },
]);
</script>

<template>
  <main class="min-h-screen my-auto">
    <!-- Body Container Div -->
    <div class="min-h-full">
      <!-- Section 1 -->
      <section class="w-full bg-cyan-700 h-[100%] relative">
        <div class="px-4 max-w-7xl mx-auto py-[70px] lg:py-[120px]">
          <!-- Flex Row divided -->

          <div class="flex justify-start gap-4 items-center">
            <!-- FlexRow 1 -->
            <div class="flex flex-col">
              <h1
                class="text-white text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold stroke-2"
              >
                Enjoy
              </h1>
              <p
                class="font-semibold text-5xl sm:text-7xl lg:text-8xl first-letter:text-2xl sm:first-letter:text-4xl lg:first-letter:text-5xl text-white"
              >
                $200
              </p>
            </div>
            <!-- Flex row 1 end -->

            <!-- FlexRow 2 -->
            <div class="flex flex-col md:ml-4">
              <div class="text-white">
                <h1
                  class="max-w-[200px] md:max-w-[400px] font-semibold py-2 sm:text-xl md:text-2xl lg:text-3xl"
                >
                  New Edge Financial Customers
                </h1>
                <p
                  class="text-xs sm:text-base max-w-[200px] sm:max-w-[300px] md:text-lg"
                >
                  Open a Edge Checking account and set up direct deposit
                </p>
              </div>

              <RouterLink :to="{name: 'register'}"
                class="bg-lime-700 text-white font-medium text-sm sm:text-base rounded-md p-2 mt-4 w-fit hover:bg-lime-600 transition-colors ease-linear duration-15"
              >
                Open an account
              </RouterLink>
            </div>
            <!-- Flex row 2 end -->
          </div>

          <!-- Flex Row divided end -->

          <!--  -->
        </div>
      </section>
      <!-- Section 1 End -->

      <!-- Section 2 Start -->
      <section class="w-full bg-white h-[100%] relative">
        <div class="px-4 max-w-7xl mx-auto">
          <div class="flex flex-col gap-7">
            <div class="mt-7">
              <h1
                class="text-center font-bold text-xl sm:text-2xl md:text-3xl sm:pt-7 pb-6"
              >
                Pick what works best for you
              </h1>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:hidden">
              <div
                v-for="(list, index) in chwrfu"
                :key="index"
                class="flex flex-col items-center my-5"
              >
                <div>
                  <img
                    class="bg-contain w-[35px] h-[35px]"
                    :src="`./icons/${list.icon}`"
                    :alt="`${list.text}`"
                  />
                </div>
                <div>
                  <p class="text-center text-cyan-800 font-semibold">
                    {{ list.text }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Carousel -->
            <div class="hidden sm:block mb-10">
              <swiper
                :modules="modules"
                :slides-per-view="3"
                :space-between="70"
                navigation
                :pagination="{ clickable: true }"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
              >
                <swiper-slide v-for="(list, index) in chwrfu" :key="index">
                  <div class="flex flex-col items-center my-5 pb-7">
                    <div>
                      <img
                        class="bg-contain w-[35px] h-[35px]"
                        :src="`./icons/${list.icon}`"
                        :alt="`${list.text}`"
                      />
                    </div>
                    <div>
                      <p class="text-center text-cyan-800 font-semibold">
                        {{ list.text }}
                      </p>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <!-- Carousel -->
          </div>

          <div>
            <!-- Auto Loan SubSection-->
            <div class="flex flex-col sm:flex-row mb-7 mt-[40px]">
              <div
                class="bg-cyan-800 w-full flex sm:flex-col items-center justify-between px-3 py-[30px] sm:w-[270px]"
              >
                <p
                  class="text-sm sm:text-xl sm:font-semibold text-center text-white"
                >
                  Edge Financial Auto
                </p>
                <img
                  class="w-[40px] h-[40px] sm:h-[50px] sm:w-[50px]"
                  src="../../assets/icons/car-wh.png"
                  alt="logo-car"
                />
              </div>
              <div class="flex flex-col bg-white border w-full">
                <div class="px-2 mt-6 ml-6">
                  <h1 class="font-bold pb-4 sm:text-lg md:text-xl">
                    Shop, finance and manage in one spot
                  </h1>
                  <p class="text-sm pb-[40px] sm:text-base md:max-w-[500px]">
                    Use our online tools to shop and explore financing for your
                    next car from the comfort of your home.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium md:text-base text-sm rounded-md p-2 mt-4 w-fit mb-6"
                  >
                    Take a look
                  </button>
                </div>
              </div>
            </div>
            <!--Auto Subsection End  -->

            <!-- Home Loan SubSection-->
            <div class="flex flex-col sm:flex-row mb-7">
              <div
                class="bg-cyan-800 w-full flex sm:flex-col items-center justify-between px-3 py-[30px] sm:w-[270px]"
              >
                <p
                  class="text-sm sm:text-xl sm:font-semibold text-center text-white"
                >
                  Edge Home Lending
                </p>
                <img
                  class="w-[40px] h-[40px] sm:h-[50px] sm:w-[50px]"
                  src="../../assets/icons/home-wt.png"
                  alt="logo-car"
                />
              </div>
              <div class="flex flex-col bg-white border w-full">
                <div class="px-2 mt-6 ml-6">
                  <h1 class="font-bold pb-4 sm:text-lg md:text-xl">
                    You may be eligible for a low mortgage rate
                  </h1>
                  <p class="text-sm pb-[40px] sm:text-base md:max-w-[500px]">
                    Home Lending. You may be eligible for a low mortgage rate.
                    You deserve this opportunity to lock in a low interest rate
                    when you refinance or buy your new home — and we can help.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium text-sm md:text-base rounded-md p-2 mt-4 w-fit mb-6"
                  >
                    View Rates
                  </button>
                </div>
              </div>
            </div>
            <!--Home Subsection End  -->

            <!-- Home Loan SubSection-->

            <div class="flex flex-col sm:flex-row">
              <div
                class="bg-cyan-800 w-full flex sm:flex-col items-center justify-between px-3 py-[30px] sm:w-[270px]"
              >
                <p
                  class="text-sm sm:text-xl sm:font-semibold text-center text-white"
                >
                  Edge Platinum Holdings
                </p>
                <img
                  class="w-[40px] h-[40px] sm:h-[50px] sm:w-[50px]"
                  src="../../assets/icons/cheque-wt.png"
                  alt="logo-car"
                />
              </div>
              <div class="flex flex-col bg-white border w-full">
                <div class="px-2 mt-6 ml-6">
                  <h1 class="font-bold pb-4 sm:text-lg md:text-xl">
                    Earn 70,000 bonus points
                  </h1>
                  <p class="text-sm pb-[40px] sm:text-base md:max-w-[500px]">
                    Edge SPlatinum Preferred(R). Earn 70,000 bonus points.
                    70,000 bonus points, worth 900 dollars when redeemed for
                    travel through Ultimate Rewards. Plus, 3x points on dining.
                    Terms apply.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium text-sm md:text-base rounded-md p-2 mt-4 w-fit mb-6"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <!--Home Subsection End  -->
          </div>
        </div>
      </section>
      <!-- Section 2 End -->

      <!-- Section 3 start -->

      <section class="w-full bg-white h-[100%] relative mt-5 sm:mt-9">
        <div class="px-4 my-4 max-w-7xl mx-auto">
          <div class="flex flex-col gap-6">
            <!-- Explore Section -->
            <div class="flex flex-col space-y-3">
              <div>
                <h1
                  class="font-bold text-2xl sm:text-3xl pt-5 pb-3 text-gray-800"
                >
                  Explore the Business Resource Center
                </h1>
              </div>
              <div class="flex flex-row items-center space-x-7">
                <img
                  class="bg-contain w-[50%] sm:w-[300px] sm:h-[300px] h-[150px] rounded-md"
                  src="../../assets/files/coworker-tablet-tile.jpg"
                  alt="image-explore"
                />
                <div class="flex flex-col space-y-6">
                  <p class="max-w-[500px]">
                    Find articles, videos and more to help you start, manage or
                    grow your business.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium text-sm md:text-base rounded-md p-2 mt-4 w-fit my-3"
                  >
                    View resources
                  </button>
                </div>
              </div>
            </div>
            <!-- Explore section End -->

            <div class="w-full h-[2px] bg-gray-300 mt-[60px]"></div>

            <!-- Depositing Section -->
            <div class="flex flex-col space-y-3">
              <div>
                <h1
                  class="font-bold text-2xl sm:text-3xl pt-5 pb-3 text-gray-800"
                >
                  Depositing checks is a snap
                </h1>
              </div>
              <div class="flex flex-row items-center gap-4">
                <img
                  class="bg-contain w-[50%] sm:w-[300px] sm:h-[300px] h-[150px] rounded-md"
                  src="../../assets/files/img2.jpg"
                  alt="image-explore"
                />
                <div class="flex flex-col space-y-2">
                  <p class="max-w-[500px]">
                    Edge QuickDeposit℠ lets you easily deposit checks from
                    virtually anywhere. Just open the Edge Mobile℠ app, take a
                    photo and access your money.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium text-sm md:text-base rounded-md p-2 mt-4 w-fit my-3"
                  >
                    See How
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full h-[2px] bg-gray-300 mt-[60px]"></div>
            <!-- Depositing section End -->

            <!-- Depositing Section -->
            <div class="flex flex-col space-y-3">
              <div>
                <h1
                  class="font-bold text-2xl sm:text-3xl pt-5 pb-3 text-gray-800"
                >
                  Open our most popular savings account
                </h1>
              </div>
              <div class="flex flex-row items-center gap-4">
                <img
                  class="bg-contain w-[50%] sm:w-[300px] sm:h-[300px] h-[150px] rounded-md"
                  src="../../assets/files/img1.jpg"
                  alt="image-explore"
                />
                <div class="flex flex-col space-y-2">
                  <p class="max-w-[500px]">
                    Apply for a new Egde Savings℠ account to start saving for
                    what matters.
                  </p>
                  <button
                    class="bg-lime-700 text-white font-medium text-sm md:text-base rounded-md p-2 mt-4 w-fit my-3"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full h-[2px] bg-gray-300 mt-[60px]"></div>
            <!-- Depositing section End -->
          </div>
        </div>
      </section>
      <!-- Section 3 End -->

      <!-- Section 4 starts -->
      <section class="w-full bg-white h-[100%] relative mt-[40px] md:mt-[50px]">
        <div class="px-4 my-4 max-w-7xl mx-auto">
          <div class="mt-7 mb-4">
            <h1
              class="text-2xl md:text-4xl font-medium text-gray-800 tracking-wide"
            >
              News & Stories
            </h1>
          </div>

          <div class="my-4 relative">
            <div
              v-for="(listn, index) in nands"
              class="flex flex-row items-center mb-6 space-x-4 mt-10"
            >
              <img
                class="aspect-square max-w-[200px] md:max-w-[200px] h-24 md:h-[200px] rounded-md shadow-md"
                :src="`./files/${listn.icon}`"
                alt="image"
              />
              <div class="flex flex-col gap-3">
                <p
                  class="font-medium text-base md:text-lg max-w-[260px] text-gray-800"
                >
                  {{ listn.text }}
                </p>
              </div>
            </div>

            <div>
              <button class="font-semibold text-lg text-lime-700">
                See more >
              </button>
            </div>
          </div>
          <hr />

          <!-- Follow Us Sub Section Start -->

          <div class="flex items-center gap-4 mt-7">
            <div>
              <h1 class="font-semibold text-sm">Follow us:</h1>
            </div>

            <div>
              <ul class="flex flex-row gap-3 items-center">
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/fb-gray.png"
                    alt="fb-logo"
                  />
                </li>
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/ig-gray.png"
                    alt="ig-logo"
                  />
                </li>
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/tw-gray.png"
                    alt="tw-logo"
                  />
                </li>
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/yt-grayt.png"
                    alt="tw-logo"
                  />
                </li>
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/linkedin-gray.png"
                    alt="tw-logo"
                  />
                </li>
                <li>
                  <img
                    class="w-[30px] h-[30px]"
                    src="../../assets/icons/pinterest-gray.png"
                    alt="tw-logo"
                  />
                </li>
              </ul>
            </div>
          </div>

          <!-- Follow us Sub Section Ends -->
        </div>
      </section>
      <!-- Section 4 ends -->

      <!-- Section 5 starts -->

      <section class="w-full bg-gray-200 h-full relative">
        <div class="px-4 my-4 max-w-7xl mx-auto">
          <!-- Subsection 1 -->
          <div class="my-5 flex flex-col items-center gap-4">
            <div class="mt-[30px]">
              <h1
                class="text-3xl text-gray-800 font-bold underline underline-offset-[14px] decoration-lime-700 text-center"
              >
                Contact us
              </h1>
            </div>
            <!-- 1  -->
            <div class="flex flex-col items-center gap-4 mt-9 mb-6">
              <div class="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10 text-gray-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>
              <h1 class="text-xl text-gray-800 font-semibold text-center">
                Let's Meet
              </h1>
              <p class="font-semibold text-lg text-center text-gray-800 py-5">
                Review your calendar and find a <br />
                convenient time to meet with us.
              </p>
              <button class="flex items-center">
                <span class="font-semibold text-sm">
                  Schedule an Appointment</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
            <!-- 1 -->

            <!-- 2 -->
            <div class="flex flex-col items-center gap-4 mt-9 mb-6">
              <div class="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <h1 class="text-xl text-gray-800 font-semibold text-center">
                Visit Us
              </h1>
              <p class="font-semibold text-lg text-center text-gray-800 py-5">
                Find a EFS location near you<br />
                and stop to see us.
              </p>
              <button class="flex items-center">
                <span class="font-semibold text-sm"> Find a EFS Branch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
            <!-- 2 -->

            <!-- 3 -->
            <div class="flex flex-col items-center gap-4 mt-9 mb-6">
              <div class="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </div>
              <h1 class="text-xl text-gray-800 font-semibold text-center">
                Call Us
              </h1>
              <p class="font-semibold text-lg text-center text-gray-800 py-5">
                Mon - Fri: 7 a.m. - 10 p.m. ET<br />
                Sat - Sun: 8 a.m. - 5 p.m. ET
              </p>
              <button class="flex items-center">
                <span class="font-semibold text-sm">
                  Call 1-866-888-721-369</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
            <!-- 3 -->
          </div>
          <!-- Subsection 1 -->
        </div>
      </section>

      <!-- Section 5 ends -->
      <!-- Section 6 starts -->
      <section class="w-full bg-gray-200 h-full relative">
        <div class="px-4 my-4 max-w-7xl mx-auto">
          <!-- Important Disclosure -->

          <!-- ID ends -->
        </div>
      </section>
      <!-- Section 6 ends -->
    </div>
    <!-- Body Container -->
  </main>
</template>

<style scoped></style>
