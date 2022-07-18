import { Avatar } from "@mui/material"
import styled from "styled-components"

function ChatComponent({ id, users }) {
  return (
    <Container>
      <UserAvatar />
      <p>Recepient Email</p>
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