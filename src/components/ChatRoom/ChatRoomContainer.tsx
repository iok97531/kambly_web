import { socket } from "../../socket";
import messageType from './chatMessageType';
import ChatRoomPropType from "./ChatRoomPropType";
import ChatRoomView from "./ChatRoomView";
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { action } from "mobx";

const ChatRoomContainer: React.FC = observer(() =>{
  let state = useLocalObservable(() => ({
    messages: [] as Array<messageType>,
    message: "123321",
  }))
  
  // 소켓 연결 및 이벤트 리스너 등록
  useEffect(action(() => {
    socket.connect();
    
    // 서버에서 메시지 받기
    const handleMessage = (msg: messageType) => {
      console.log('msg: ', msg)
      state.messages = [...state.messages, msg];
    }

    socket.on("chatMessage", handleMessage);
    
    return () => {
      socket.off("chatMessage", handleMessage);;
      socket.disconnect();
    };
  }), []);
  
  const sendMessage: React.MouseEventHandler<HTMLButtonElement> = action(() => {
    if (state.message.trim() !== "") {
      socket.emit("chatMessage", {
        message: state.message,
        fromUserId: 1,
        toUserId: 2
      }); // 서버로 메시지 전송
      state.messages = [...state.messages, { message: state.message, fromUserId: 1, toUserId: 2 }];
      state.message = "12";
    }
  });
  
  const props: ChatRoomPropType = { state, sendMessage }
  return <ChatRoomView {...props} />
})

export default ChatRoomContainer;