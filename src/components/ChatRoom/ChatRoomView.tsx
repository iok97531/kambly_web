import ChatRoomPropType from "./ChatroomPropType"
import messageType from "./messageType"
import _ from 'lodash'

function ChatRoomView(props: ChatRoomPropType) {
  const {
    messages,
    sendMessage
  } = props

  return <div>
      { _.map(messages, (m: messageType) => {
        return <p>{m.text}</p>
      })

      }
      <button onClick={sendMessage}>
        send message
      </button>
    </div>
}

export default ChatRoomView