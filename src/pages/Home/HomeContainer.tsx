import HomePropType from './HomePropType'
import HomeView from './HomeView'
import { socket } from "../../socket";
import { useState, useEffect } from "react";
import messageType from './messageType';



function HomeContainder() {
  
  
  const [messages, setMessages] = useState<Array<messageType>>([]);
  const [message, setMessage] = useState<string>("");
  
  // 소켓 연결 및 이벤트 리스너 등록
  useEffect(() => {
    socket.connect();
    
    // 서버에서 메시지 받기
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", message); // 서버로 메시지 전송
      setMessages((prev) => [...prev, { text: message, senderId: 1 }]);
      setMessage("");
    }
  };
  
  const props: HomePropType = { messages, message, sendMessage }
  return <HomeView {...props} />
} 

export default HomeContainder