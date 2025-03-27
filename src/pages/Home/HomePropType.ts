import messageType from "../../components/ChatRoom/messageType";

type HomePropType = {
  messages: Array<messageType>,
  message: string,
  sendMessage: React.MouseEventHandler<HTMLButtonElement>
}
export default HomePropType;