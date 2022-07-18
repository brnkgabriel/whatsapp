import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../fb"
import { useRouter } from "next/router"
import { Avatar, IconButton, Button } from "@mui/material"
import { MoreVertRounded, AttachFile } from "@mui/icons-material"

function ChatScreen({ chat, messages }) {
  const [ user ] = useAuthState(auth)
  const router = useRouter()
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
        {/* Show messages */}
        <EndOfMessage />
      </MessageContainer>
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

const MessageContainer = styled.div``

const EndOfMessage = styled.div`

`