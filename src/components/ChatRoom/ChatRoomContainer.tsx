import { socket } from "../../socket";
import { useState, useEffect } from "react";
import messageType from './messageType';
import ChatRoomPropType from "./ChatroomPropType";
import ChatRoomView from "./ChatroomView";



const ChatRoomContainder: React.FC = () =>{
  
  
  const [messages, setMessages] = useState<Array<messageType>>([]);
  const [message, setMessage] = useState<string>("123321");
  
  // 소켓 연결 및 이벤트 리스너 등록
  useEffect(() => {
    socket.connect();
    
    // 서버에서 메시지 받기
    const handleMessage = (msg: messageType) => {
      console.log('msg: ', msg)
      setMessages((prev) => [...prev, msg]);
    }

    socket.on("chatMessage", handleMessage);
    
    return () => {
      socket.off("chatMessage", handleMessage);;
      socket.disconnect();
    };
  }, []);
  
  const sendMessage: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (message.trim() !== "") {
      console.log(message, messages)
      socket.emit("chatMessage", message); // 서버로 메시지 전송
      setMessages((prev) => [...prev, { text: message, senderId: 1 }]);
      setMessage("12");
    }
  };
  
  const props: ChatRoomPropType = { messages, message, sendMessage }
  return <ChatRoomView {...props} />
} 

export default ChatRoomContainder