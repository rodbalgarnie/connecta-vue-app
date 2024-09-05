import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
        
    plugins: [createPersistedState({
        paths: ['token','user','loggedin'],
      })],
          
           state: {
              token:'',
              user:{},
              loggedin:false,
              openmenu:false,
              mobile:false,
          },
          mutations: {
              settoken(state, token) {
                     state.token = token
              },

              setuser(state, user) {
                     state.user = user
              },
            
              setrovers(state, rovers){
                     state.rovers = rovers
              },

              setloggedin(state, loggedin) {
                     state.loggedin = loggedin
              },
  
              setopenmenu(state, openmenu) {
                     state.openmenu = openmenu
              },
              
         },
          getters: {
              token (state) {
                     return state.token
              },

              user (state) {
                     return state.user 
              },
              loggedin (state) {
                      return state.loggedin
              },
              openmenu (state) {
                      return state.openmenu
              },
              mobile (state) {
                     return state.mobile
              },
           }
      })
      
export default store