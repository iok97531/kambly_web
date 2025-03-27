import HomePropType from "./HomePropType";
import ChatRoom from '../../components/ChatRoom'

function HomeView(props: HomePropType) {
  return <div style={{display: 'flex'}}>
      Home
      <ChatRoom />
    </div>
}

export default HomeView