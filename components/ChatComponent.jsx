import { Avatar } from "@mui/material"
import styled from "styled-components"
import getRecipientEmail from "../utils/getRecipientEmail"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, collection, query, where } from "../fb"
import { useCollection } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

function ChatComponent({ id, users }) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  
  const recipientEmail = getRecipientEmail(users, user.email)

  const userChatRef = collection(db, "users")
  const q = query(userChatRef, where("email", "==", recipientEmail))
  const [recepientSnapshot] = useCollection(q)

  const recipient = recepientSnapshot?.docs?.[0]?.data() 

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }
  return (
    // continue from 1:50:28
    <Container onClick={enterChat}>
      { recipient ? <UserAvatar src={recipient.photoURL} /> : <UserAvatar>{ recipientEmail[0] }</UserAvatar>}
      <p>{ recipientEmail }</p>
    </Container>
  )
}

export default ChatComponent

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-all;

:hover {
  background-color: #e9eaeb;
}
`

const UserAvatar = styled(Avatar)`
margin: 5px;
margint-right: 5px;
`