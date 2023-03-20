import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getAuth } from 'firebase/auth'
import db from '../firebase/firebaseInit'
import { collection, getDoc, doc } from "firebase/firestore";

export const useAuthStore = defineStore('auth', () => {

    const userAuth = ref({
        user: null,
        userEmail: null,
        userFirstName: null,
        userLastName: null,
        userName: "",
        userID: null,
        userInitials: "",
        userAccount: null,
    })

    const updateUser = async (payload) => {
        userAuth.value.user = payload
    }

    const setUserProfile = async (doc) => {
        Object.assign(userAuth.value,

            {
                userEmail: doc.userEmail,
                userFirstName: doc.firstName,
                userLastName: doc.lastName,
                userName: doc.userName,
                userID: doc.userId,
                userAccount: doc.userAccount,

            })
    }

    const setUserProfileInitials = () => {
        return userAuth.value.userInitials = userAuth.value.userFirstName.match(/(\b\S)?/g).join("") + " " + userAuth.value.userLastName.match(/(\b\S)?/g).join("")
    }

    const getCurrentUser = async () => {
        const firebaseAuth = getAuth()
        const dataBase = collection(db, "users");
        const dbRef = doc(dataBase, firebaseAuth.currentUser.uid)
        const docSnap = await getDoc(dbRef)

        if (docSnap.exists()) {
            setUserProfile(docSnap.data())
            setUserProfileInitials()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    function increment() {
        count.value++
    }




    return { userAuth, setUserProfileInitials, increment, getCurrentUser, updateUser, setUserProfile }
})
