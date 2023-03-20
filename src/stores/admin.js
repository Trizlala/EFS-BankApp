import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getAuth } from 'firebase/auth'
import db from '../firebase/firebaseInit'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export const useAdminStore = defineStore('admin', () => {

    const users = ref({
        user: [],
    })

    const recentTransactions = ref([])

    async function getAllUser() {
        console.log('getAllUser');

        const dataBase = collection(db, "users");
        const querySnapshot = await getDocs(dataBase);

        querySnapshot.forEach((doc) => {
            users.value.user.push(doc.data());
        });
    }

    const setUserTransactions = async (doc) => {
        recentTransactions.value.push(doc)
    }


    const getRecentTransactions = async () => {
        const firebaseAuth = getAuth()
        const dataBase = collection(db, "users");
        const dbRef = doc(dataBase, firebaseAuth.currentUser.uid)
        const docSnap = await getDoc(dbRef)

        if (docSnap.exists()) {
          setUserTransactions(docSnap.data().userAccount)
            // console.log(docSnap.data().userAccount);


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    return { users, recentTransactions, getAllUser, getRecentTransactions }

})
