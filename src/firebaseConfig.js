import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyBevEKMSOedxA4w5IHBJ2yfZDglgLGQmqI",
    authDomain: "korea-food-c3f51.firebaseapp.com",
    databaseURL: "https://korea-food-c3f51.firebaseio.com",
    projectId: "korea-food-c3f51",
    storageBucket: "korea-food-c3f51.appspot.com",
    messagingSenderId: "296337781490",
    appId: "1:296337781490:web:db92270e26435f6443166b",
    measurementId: "G-FEZJ4BN2FQ"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore() 
const auth = firebase.auth()

export {db, auth}
