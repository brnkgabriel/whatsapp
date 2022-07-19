import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import {
  auth,
  db,
  collection,
  query,
  doc,
  orderBy,
  setDoc,
  serverTimestamp,
  addDoc
} from "../fb"
import { useRouter } from "next/router"
import { Avatar, IconButton, Button } from "@mui/material"
import { MoreVertRounded, AttachFile, InsertEmoticon, KeyboardVoice } from "@mui/icons-material"
import { useState } from "react"
import Message from "./Message"

function ChatScreen({ chat, messages }) {
  const [ user ] = useAuthState(auth)
  const [input, setInput] = useState("")
  const router = useRouter()

  const chatsRef = collection(db, "chats", router.query.id, "messages")
  const q = query(chatsRef, orderBy("timestamp", "asc"))
  const [ messagesSnapshot ] = useCollection(q)

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
        key={message.id}
        user={message.data().user}
        message={{
          ...message.data(),
          timestamp: message.data().timestamp?.toDate().getTime()
        }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => {
        <Message
          key={message.id}
          user={message.user}
          message={message}
          />
      })
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    
    // update the lastSeen
    const ref = doc(db, "users", user.uid)
    await setDoc(ref, { lastSeen: serverTimestamp() }, { merge: true })
    // continue from 2:58:05

    // always ensure if you have nested query like below it's fetched like this
    // collection(db, collection, document, collection, document....)
    // collections will be odd

    // the same for nested documents
    // documents will be even
    const chatsRef = collection(db, "chats", router.query.id, "messages")
    const docRef = await addDoc(chatsRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    setInput("")
  }
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last seen...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
            <MoreVertRounded />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send message</button>
        <KeyboardVoice />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`

`

const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
margin-left: 15px;
flex: 1;
> h3 {
  margin: unset;
  margin-bottom: 3px;
}
> p {
  font-size: 14px;
  color: gray;
  margin: unset;
}
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
padding: 30px;
background-color: #e5ded8;
min-height: 90vh
`

const EndOfMessage = styled.div`

`
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Input = styled.input`
flex: 1;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: whitesmoke;
outline: 0;
border: none;
border-radius: 10px;
margin-left: 15px;
margin-right: 15px;
`