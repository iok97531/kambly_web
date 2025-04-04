import { observer } from "mobx-react-lite"
import ChatRoomPropType from "./ChatRoomPropType"
import _ from 'lodash'
import { Button, TextField } from "@mui/material"
import ChatMessage from "./ChatMessage"
import { action } from "mobx"
import chatMessageType from "./chatMessageType"

const ChatRoomView: React.FC<ChatRoomPropType> = observer((props: ChatRoomPropType) => {
  const {
    state,
    sendMessage
  } = props

  return (
    <div style={{ 
      width: 400, 
      height: 600,
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'white',
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: 16 
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {_.map(state.messages, (m: chatMessageType, index: number) => (
          <ChatMessage key={index} chatMessage={m} />
        ))}
      </div>
      <div style={{
        display: 'flex',
        padding: '16px',
        borderTop: '1px solid #E9ECEF',
        backgroundColor: '#F8F9FA',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}>
        <TextField
          fullWidth
          size="small"
          value={state.message}
          onChange={action((e: React.ChangeEvent<HTMLInputElement>) => (state.message = e.target.value))}
          placeholder="메시지를 입력하세요..."
          sx={{ marginRight: 1 }}
        />
        <Button 
          variant="contained"
          onClick={sendMessage}
          sx={{ minWidth: 80 }}
        >
          전송
        </Button>
      </div>
    </div>
  )
})

export default ChatRoomView