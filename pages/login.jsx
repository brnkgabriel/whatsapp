import styled from "styled-components"
import Head from "next/head"
import { Button } from "@mui/material"
import { auth, signInWithPopup, provider, GoogleAuthProvider } from "../fb"

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
    }).catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      alert(errorMessage)
    })
  }
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png"/>
        <Button variant="outlined" onClick={signIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 100px;
background-color: white;
border-radius: 5px;
box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
`

const Logo = styled.img`
height: 100px;
width: 100px;
margin-bottom: 50px;
`