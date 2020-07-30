import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Vue from 'vue'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)

let cookieValue="" 
let token=""

let value=document.cookie.split('; ').find(row => row.startsWith('resetlink'))
let tokenvalue=document.cookie.split('; ').find(row => row.startsWith('token'))


if(value){
    cookieValue = value.split('=')[1];
}
if(tokenvalue){
  token = tokenvalue.split('=')[1];
}


// console.log(document.cookie)
// console.log(cookieValue)

// Admin pages

const Profile = () => import(/* webpackChunkName: "common" */ "@/screens/Profile.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/screens/Login.vue");

const ForgotPassword = () => import(/* webpackChunkName: "common" */ "@/screens/ForgotPassword.vue");
const Request = () => import(/* webpackChunkName: "common" */ "@/screens/Request.vue");
const ResetPassword = () => import(/* webpackChunkName: "common" */ "@/screens/ResetPassword.vue");

const Dashboard = () => import(/* webpackChunkName: "common" */ "@/screens/RequestDashboard.vue");

const Signout = () => import(/* webpackChunkName: "common" */ "@/screens/Signout.vue");

const AdminAccess = () => import(/* webpackChunkName: "common" */ "@/screens/AdminAccess.vue");

const Logs = () => import(/* webpackChunkName: "common" */ "@/screens/Logs.vue");

var routes= [];

console.log(token)

    routes = [
    {
      path: '/',
      name: 'Login',
        

        beforeEnter: (to, from, next) => {

            if (!token) {
              next()
            }
          
            else if(token){
              next({path:'/request'})
            }
               
        },
        component: function(){
          return import("@/screens/Login.vue")
                 
        },

    },
    {

      path: '/request',
      beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }
           
    },

      component: function(){
       
          return import("@/layout/dashboard/DashboardLayout.vue")
       
      },
      redirect: '/',

      children: [
        {
          path: "/",
          name: "Request",
          component: Request
        },
      ]
    },
    {
      path: '/dashboard',
      
      beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }
           
    },

      component: function(){
       
          return import("@/layout/dashboard/DashboardLayout.vue")
       
      },

      redirect: '/',

      children: [
        {
          path: "/",
          name: "Dashboard",
          component: Dashboard
        },
      ]
    },
    {
      path: '/forgot-password',
      name: 'Forgot-Password',
      component: ForgotPassword
    },
    {
      path: '/profile',
       beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }
           
    },

      component: function(){
       
          return import("@/layout/dashboard/DashboardLayout.vue")
       
      },
      redirect: '/',

      children: [
        {
          path: "/",
          name: "profile",
          component: Profile
        },
      ]
      
    },
    {
      path: '/resetpassword'+cookieValue,
      name: 'Reset Password',
      // beforeEnter: (to, from, next) => {

      //   if (!token) {
      //     next()
      //   }
      //   else {
      //     next({path:'/'})
      //   }
           
      // },

      component: ResetPassword
    },
    {

      path: '/signout',
      name: 'SignOut',
     
      beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }

      },

    component: Signout,

    },

    {
      path: '/adminaccess',
      beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }
           
    },

      component: function(){
       
          return import("@/layout/dashboard/DashboardLayout.vue")
       
      },
      redirect: '/',

      children: [
        {
          path: "/",
          name: "AdminAccess",
          component: AdminAccess
        },
      ]
    },
    {
      path: '/logs',
      beforeEnter: (to, from, next) => {

        if (token) {
          next()
        }
        else {
          next({path:'/'})
        }
           
    },

      component: function(){
       
          return import("@/layout/dashboard/DashboardLayout.vue")
       
      },
      redirect: '/',

      children: [
        {
          path: "/",
          name: "Logs",
          component: Logs
        },
      ]
    },
  ]




/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;