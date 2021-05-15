import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect } from 'react';
import axios from 'axios';

export default function ChatModule() {
    const token = window.sessionStorage.getItem("Authorization");




  //Public API that will echo messages sent to it back to the client
  let [roomname, setRoomName] = useState();
  const [socketUrl, setSocketUrl] = useState('ws://' + "127.0.0.1:8000" +
    '/ws/chat/' + roomname + '/' + "?token="+token);
  const messageHistory = useRef([]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setRoomName(window.sessionStorage.getItem("MakeRoomName"));
      console.log(roomname);
      // alert("Succ");
    })
    .catch(function(error){
      console.log(roomname);
      console.log(error);
      alert("fail")
    })
  },[]);


  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);

  messageHistory.current = useMemo(() =>
    messageHistory.current.concat(lastMessage),[lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() =>
    setSocketUrl('ws://' + "127.0.0.1:8000" +
    '/ws/chat/' + roomname + '/' + "?token="+token), []);

  const handleClickSendMessage = useCallback(() =>
    sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickChangeSocketUrl}
      >
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
      <ul>
        {/* {messageHistory.current
          .map((message, idx) => <span key={idx}>{message.data}</span>)} */}
      </ul>
    </div>
  );
};