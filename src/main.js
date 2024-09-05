import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios';
axios.defaults.baseURL = 'https://ip-rtk-aws.com';
Vue.use(Vuex)

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
    fieldsBagName: 'veeFields',
    events: ''
});

import 'bootstrap'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

import UserLogin from './components/UserLogin.vue'
import UserLogout from './components/UserLogout.vue'
import ResetPasswordForm from './components/ResetPasswordForm.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import DashBoard from './components/DashBoard.vue'
import HomePage from './components/HomePage.vue'

Vue.component('home-landing', require('./components/HomeLanding.vue').default)

const router = new VueRouter({

    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        //reset scroll position on navigation, if you use back/foward remeber position
        if(savedPosition){ return savedPosition;}
        return { x: 0, y: 0 };
    },

    routes: [
        {
            path: '/',
            name: 'login',
            component: UserLogin
        },
        {
            path: '/logout',
            name: 'logout',
            component: UserLogout
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: ForgotPassword,
            meta: {
                auth: false
            }
        },
        {
            path: '/password/reset',
            name: 'reset-password-form',
            component: ResetPasswordForm,
            meta: {
                auth: false
            }
        },
        {
            path: '/home',
            name: 'home',
            component: DashBoard,


    children: [
      {
        path: '/homepage', 
        name: 'homepage',
        component: HomePage, 
      },
      ]
        },


    ]

})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
