import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseAuth = getAuth();

import App from './App.vue'
import router from './router'


import './style.css'

let appContainer
onAuthStateChanged(firebaseAuth, async(user) => {

    if (!appContainer) {
        const app = createApp(App)

        app.use(createPinia())

        app.use(router)

        app.mount('#app')
        console.log(app.config)
    }

})



