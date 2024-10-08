import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginForm from "../components/LoginForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
import RecoveryPage from "@/views/RecoveryPage.vue";
import RecoveryForm from "../components/RecoveryForm.vue";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";
import SuccessComponent from "@/components/SuccessComponent.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import UserPage from "@/views/UserPage.vue";
import PatientsPage from "@/views/PatientsPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        name: "LoginForm",
        component: LoginForm,
      },
      {
        path: "signup",
        name: "SignUp",
        component: SignUpForm,
      },
    ],
  },
  {
    path: "/recovery",
    component: RecoveryPage,
    children: [
      {
        path: "",
        name: "RecoveryForm",
        component: RecoveryForm,
      },
      {
        path: "reset_password",
        name: "ResetPassword",
        component: ResetPasswordForm,
        props: (route) => ({ token: route.query.token }),
      },
    ],
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessComponent,
    props: true,
  },
  {
    path: "/home",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    component: UserPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "user_information",
        name: "UserInformation"
      },
    ],
  },
  {
    path: "/patients",
    component: PatientsPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      next({ name: "LoginForm" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
