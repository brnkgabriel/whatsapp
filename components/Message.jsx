import styled from "styled-components"

function Message({message}) {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  )
}

export default Message

const Container = styled.div``