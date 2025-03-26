import messageType from "./messageType";

type HomePropType = {
  messages: Array<messageType>,
  message: string,
  sendMessage: Function
}
export default HomePropType;