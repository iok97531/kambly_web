import messageType from "./chatMessageType";

type ChatRoomPropType = {
  state: {
    messages: Array<messageType>,
    message: string
  },
  sendMessage: React.MouseEventHandler<HTMLButtonElement>
}

export default ChatRoomPropType;