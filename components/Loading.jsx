import { Circle } from "better-react-spinkit"

function Loading() {
  return (
    <center style={{display: "grid", placeItems:"center", height: "100vh"}}>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png"
        alt=""
        style={{marginBottom: 10}}
        height={100}/>
        <Circle color="#3cbc28" />
      </div>
    </center>
  )
}

export default Loading