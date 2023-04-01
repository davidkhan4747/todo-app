import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// import { initializeApp } from "firebase/app";
// import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3lEhB-IsqSejv6DRJ5ENv5sFJcIbIcSM",
    authDomain: "todo-app-khan-e5049.firebaseapp.com",
    projectId: "todo-app-khan-e5049",
    storageBucket: "todo-app-khan-e5049.appspot.com",
    messagingSenderId: "710847217732",
    appId: "1:710847217732:web:447d5e3c32bfcf7f7cfc11"
  };

class Fire  {
    constructor (callback){
        this.init(callback)
    }

    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null , user )
            } else {
                firebase
                .auth()
                .signInAnonymously()
                .catch(
                    error=>{
                        callback(error)
                    })
            }
        })
    }
    getLists(callback) {
        let ref = this.ref.orderBy("name")
        
            this.unsubscribe = ref.onSnapshot(snapshot => {
                
                lists = []

                snapshot.forEach(doc => {
                    lists.push({id : doc.id , ...doc.data()})
                })
                callback(lists)
            })
    }

    addList(list){
        let ref = this.ref
        ref.add(list)
    }

    updateList(list){
        let ref = this.ref

        ref.doc(list.id).update(list)
    }

    get userId()    {
        return firebase.auth().currentUser.uid 
       
    }
    get ref() {
        return firebase
        .firestore()
        .collection("users") 
        .doc(this.userId)
        .collection("lists");
        
    }
    detach() {
        this.unsubscribe()
    }
}       

export default Fire     