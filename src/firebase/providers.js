import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()


export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)

        const user = result.user;
        const {displayName, uid, email, photoURL} = user;

        return{
            ok:true,
            displayName,
            uid,
            email,
            photoURL,
        }
    } catch (error) {
        return{
            ok:false,
            errorMessage: 'Error sign in'
        }
    }
}


export const registerWithEmailPassword = async({email, password, displayName}) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

        const {uid, photoURL} = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        
        return{
            ok:true,
            displayName,
            email,
            uid,
            photoURL
        }
    } catch (error) {
        return{
            ok: false,
            errorMessage: 'user already exists',
        }
    }

}

export const signInWithEmailPassword = async({email, password}) => {
     
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        
        const {uid, displayName, photoURL} = resp.user;

        return{
            ok: true,
            uid,
            displayName,
            photoURL,
        }
    } catch (error) {
        return{
            ok: false,
            errorMessage: 'username does not exist'
        }
    }
    
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}