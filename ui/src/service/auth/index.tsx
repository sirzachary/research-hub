import firebase from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = firebase.initializeApp({ /* config */ })
const firebaseAuth = firebase.auth();

interface AuthContextProps {
    user: firebase.User | null;
    error: firebase.auth.Error | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({ isAuthenticated: false, user: null, error: null });

export const AuthContextProvider = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [error, setError] = useState<firebase.auth.Error | null>(null)

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(setUser, setError)
        return () => unsubscribe()
    }, [])
    return <AuthContext.Provider value={{ user, error, isAuthenticated: !!user }} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null }
}

export const login = firebaseAuth.signInWithEmailAndPassword;

export const register = firebaseAuth.createUserWithEmailAndPassword;