import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, doc, setDoc, serverTimestamp } from "../fb"
import Login from './login'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import { appBarClasses } from '@mui/material'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)


  useEffect(() => {
    if (user) {
      const ref = doc(db, "users", user.uid)
      setDoc(ref, {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true })
    }
  }, [ user ])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
