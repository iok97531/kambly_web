import { observer } from "mobx-react-lite";
import ChatMessagePropType from "./ChatMessagePropType";

const ChatMessage: React.FC<ChatMessagePropType> = observer((props: ChatMessagePropType) => {
  const { chatMessage } = props;
  const isMine = chatMessage.fromUserId === 1; // 임시로 현재 사용자 ID를 1로 설정

  return (
    <div style={{
      display: 'flex',
      justifyContent: isMine ? 'flex-end' : 'flex-start',
      margin: '8px',
    }}>
      <div style={{
        backgroundColor: isMine ? '#007AFF' : '#E9ECEF',
        color: isMine ? 'white' : 'black',
        padding: '8px 12px',
        borderRadius: '16px',
        maxWidth: '70%',
        wordBreak: 'break-word',
      }}>
        {chatMessage.message}
      </div>
    </div>
  );
});

export default ChatMessage