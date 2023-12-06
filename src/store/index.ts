import { createApp } from 'vue'
import { createStore } from 'vuex'

// Cria uma nova instância de store.
const store = createStore({
 state () {
   return {
     isLoggedIn: false
   }
 },
 mutations: {
   setLoggedIn (state, isLoggedIn) {
     state.isLoggedIn = isLoggedIn
   }
 }
})

const app = createApp({'#app'})

// Instala a instância do store como um plugin
app.use(store)
