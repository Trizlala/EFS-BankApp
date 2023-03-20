import { createRouter, createWebHistory } from 'vue-router'

import { computed } from 'vue'
import { useAuthStore } from "../stores/auth.js";


import HomeView from '../views/User/HomeView.vue'
import LoginView from '../views/User/LoginView.vue'
import RegisterView from '../views/Auth/UserRegisterView.vue'
import ForgotPassView from '../views/User/ForgotPasswordView.vue'

import WelcomeView from '../views/User/WelcomeView.vue'

import TransferView from '../views/User/TransferView.vue'
import TransferHistoryView from '../views/User/TransferHistory.vue'

import NotificationView from '../views/User/NotificationView.vue'

import AccountView from '../views/User/AccountView.vue'
import AccountStatement from '../views/User/AccountStatement.vue'

import PayBillView from '../views/User/PayBill.vue'
import PayBillHistoryView from '../views/User/PayBillHistory.vue'

import DepositChecksView from '../views/User/DepositChecks.vue'
import UserProfileView from '../views/User/UserProfile.vue'


import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import EditUser  from'../views/Admin/EditUser.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'EFS Bank - Credit Cards, Loans, Checkings',
        requiresAuth: true,
        transition: 'slide-right',
        layout: 'AppLayoutDefault'

      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        layout: 'AppLayoutDefault'
      },

    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register',
        layout: 'AppLayoutDefault'
      }
    },


    {
      path: '/forgot-password',
      name: 'forgotpass',
      component: ForgotPassView,
      meta: {
        title: 'Forgot Password',
        layout: 'AppLayoutDefault'
      }
    },


    {
      path: '/user',
      name: 'user',
      meta: {
        layout: 'AppLayoutUser'
      },
      children: [
        {
          path: 'dashboard',
          name: 'userdashboard',
          component: WelcomeView,
          meta: {
            title: "Welcome"
          }

        },

        {
          path: 'notification',
          name: 'usernotification',
          component: NotificationView,
          meta: {
            title: 'Notification',
          },

        },

        {
          path: 'account',
          name: 'useraccount',
          component: AccountView,
          meta: {
            title: 'Account Activity',
          }
        },



        {
          path: 'statement',
          name: 'userstatement',
          component: AccountStatement,
          meta: {
            title: 'Account Monthly Statement',
          }
        },
        {
          path: 'transfer',
          name: 'usertransfer',
          component: TransferView,
          meta: {
            title: 'Transfer',
          }
        },

        {
          path: 'transfer-history',
          name: 'usertransferH',
          component: TransferHistoryView,
          meta: {
            title: 'Transfer History',
          }
        },

        {
          path: 'paybill',
          name: 'userpaybill',
          component: PayBillView,
          meta: {
            title: 'Pay Bill',
          }
        },


        {
          path: 'paybill/history',
          name: 'userpaybillH',
          component: PayBillHistoryView,
          meta: {
            title: 'Pay Bill History',
          }
        },
        {
          path: 'deposit-checks',
          name: 'userdeposit',
          component: DepositChecksView,
          meta: {
            title: 'Deposit Checks',
          }
        },
        {
          path: 'manage-profile',
          name: 'userprofile',
          component: UserProfileView,
          meta: {
            title: 'Manage Profile',
          }
        },








      ],

    },

    {
      path: '/admin',
      name: 'admin',
      meta: {
        layout: 'AppLayoutAdmin'
      },
      children: [
        {
          path: 'dashboard',
          name: 'admindashboard',
          component: AdminDashboard,
          meta: {
            title: "Admin - Welcome"
          }

        },

        {
          path: 'editAccount',
          name: 'editaccount',
          component: EditUser,
          meta: {
            title: "Admin - Edit"
          }

        },
      ]
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };

  },
});

router.beforeEach((to, from, next) => {

  const authStore = useAuthStore();


  const user = computed(() => {
    return authStore.userAuth.user
  })

  if (to.name == 'user') {
    next({ name: 'userdashboard' })
  }
  document.title = `Edge Financial Services | ${to.meta.title}`;
  next()

});
export default router
