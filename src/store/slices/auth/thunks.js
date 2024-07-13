import { FirebaseAuth } from "../../../firebase/config";
import { logoutFirebase, registerWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from "../../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlices";


export const startSignInWithGoogle = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const user = await signInWithGoogle();

        if(!user.ok){
            return dispatch(logout(user.errorMessage)) 
        }

        dispatch(login(user))

    }
}


export const startRegisterWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())

        

        const {ok, uid, photoURL, errorMessage} = await registerWithEmailPassword({email, password, displayName});

        if(!ok){
            return dispatch(logout(errorMessage)) 
        }

        dispatch(login({
            email,
            displayName,
            uid,
            photoURL,
        }))
        
        
    }
}


export const startSignInWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const { ok, displayName, photoURL, uid, errorMessage } = await signInWithEmailPassword({email, password})

        if(!ok){
            return dispatch(logout(errorMessage));
        }

        dispatch(login({email, displayName, uid, photoURL}));
    }
}

export const startLogoutFirebase = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout())
    }
}