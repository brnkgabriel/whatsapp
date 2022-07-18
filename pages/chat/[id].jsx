import Head from "next/head"
import styled from "styled-components"
import Sidebar from "../../components/Sidebar"
import ChatScreen from "../../components/ChatScreen"
import {
  auth, db, collection,
  query, where, doc, getDoc,
  orderBy, getDocs
} from "../../fb"
import { useAuthState } from "react-firebase-hooks/auth"
import getRecipientEmail from "../../utils/getRecipientEmail"

function Chat({ chat, messages }) {
  const [ user ] = useAuthState(auth)

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user.email)} </title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = collection(db, "chats")

  // prep the messages on the server
  const q = await query(ref, orderBy("timestamp", "asc"))

  const querySnapshot = await getDocs(q)

  const messages = Array.from(querySnapshot)
  .map(doc => ({ id: doc.id, ...doc.data() }))
  .map(message => ({ ...message, timestamp: message.timestamp.toDate().getTime() }))
  
  // prep the chats
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef)

  let chat = {}

  if (docSnap.exists()) {
    chat = {
      id: docSnap.id,
      ...docSnap.data()
    }
  }

  // console.log("chat", chat, "messages", messages)

  return {
    props: {
      messages: JSON.stringify(messages),
      chat
    }
  }
}

const Container = styled.div`
display: flex;
`

const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;
`