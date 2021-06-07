import  firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'


let firebaseConfig = {
    apiKey: "AIzaSyCW435MdfL1SLnghf1J_MOjuiAeKY67S0c",
    authDomain: "finalyearprojectdatabase-53948.firebaseapp.com",
    projectId: "finalyearprojectdatabase-53948",
    storageBucket: "finalyearprojectdatabase-53948.appspot.com",
    messagingSenderId: "132144253316",
    appId: "1:132144253316:web:a19236791b5425572335d1"
};


// initializing firebase.
try {
    firebase.initializeApp(firebaseConfig)
}
catch(err) {
    if(!/already exists/.test(err.message)){
        console.log('firebase initialization error occurred', err.stack)
    }
}


// initializing cloud firestore.
let projectFirestore = firebase.firestore()

// initializing firebase storage
let projectStorage = firebase.storage()

// initializing firebase authentication.
let firebaseAuthentication = firebase.auth()

// creating a server timestamp.
let timestamp = firebase.firestore.FieldValue.serverTimestamp


// exporting 
export {
    projectFirestore,
    projectStorage,
    firebaseAuthentication,
    timestamp
}
