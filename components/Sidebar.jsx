import styled from "styled-components"
import { Avatar, IconButton, Button } from "@mui/material"
import { MoreVertRounded } from "@mui/icons-material"
import { Chat } from "@mui/icons-material"
import { Search } from "@mui/icons-material"
import * as EmailValidator from "email-validator"
import { auth, db, addDoc, collection, getDoc, where, query } from "../fb"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import ChatComponent from "./ChatComponent"

function Sidebar() {
  const [ user ] = useAuthState(auth)
  const userChatRef = collection(db, "chats")
  const q = query(userChatRef, where("users", "array-contains", user.email))
  const [ chatsSnapshot ] = useCollection(q)

  const createChat = () => {
    const input = prompt("Please enter an email address for the user you want to chat with")
    if (!input) return

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chat into the db "chats" collection
      addDoc(collection(db, "chats"), {
        users: [ user.email, input ]
      })
    }
  }

  const chatAlreadyExists = (recepientEmail) => {
    return !!chatsSnapshot?.docs
    .find(
      chat =>
      chat.data().users.find(user => user === recepientEmail)?.length > 0
    );
  }

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertRounded />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <Search />
        <SearchInput placeholder="search in chats" />
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chat */}
      { chatsSnapshot?.docs.map(chat => (
        <ChatComponent key={chat.id} id={chat.id} users={chat.data().users} />
      )) }
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
flex: 0.45;
border-radius: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;
`

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
background-color: white;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;

:hover {
  opacity: 0.8
}
`

const IconsContainer = styled.div``

const SearchContainer = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`

const SidebarButton = styled(Button)`
width: 100%;
&&& {
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
}
`