import io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

export const socket = io(SERVER_URL, {
  autoConnect: false, // 필요할 때만 연결
});