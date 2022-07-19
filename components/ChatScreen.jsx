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
  addDoc,
  where
} from "../fb"
import { useRouter } from "next/router"
import { Avatar, IconButton, Button } from "@mui/material"
import { MoreVertRounded, AttachFile, InsertEmoticon, KeyboardVoice } from "@mui/icons-material"
import { useState } from "react"
import Message from "./Message"
import getRecipientEmail from "../utils/getRecipientEmail"
import TimeAgo from "timeago-react"
import { useRef } from "react"

function ChatScreen({ chat, messages }) {
  const endOfMessagesRef = useRef(null)
  const [ user ] = useAuthState(auth)
  const [input, setInput] = useState("")
  const router = useRouter()

  const chatsRef = collection(db, "chats", router.query.id, "messages")
  const q = query(chatsRef, orderBy("timestamp", "asc"))
  const [ messagesSnapshot ] = useCollection(q)

  const recipRef = collection(db, "users")
  const q2 = query(recipRef, where("email", "==", getRecipientEmail(chat.users, user.email)))

  const [ recipientSnapshot ] = useCollection(q2)

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

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }) 
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
    scrollToBottom()
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recepientEmail = getRecipientEmail(chat.users, user.email)
  return (
    <Container>
      <Header>
        {
          recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar>{recepientEmail[0]}</Avatar>
          )
        }
        <HeaderInformation>
          <h3>{ recepientEmail }</h3>
          {
            recipientSnapshot ? (
              <p>Last active: {' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ): "Unavailable"}
              </p>
            ) : <p>Loading last active ...</p>
          }
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
        <EndOfMessage ref={endOfMessagesRef} />
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
padding-bottom: 50px;
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