import messageType from "./messageType";

type ChatRoomPropType = {
  messages: Array<messageType>,
  message: string,
  sendMessage: React.MouseEventHandler<HTMLButtonElement>
}
export default ChatRoomPropType;