import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router";

const AdChat = () => {
  const token = window.sessionStorage.getItem("Authorization");
  const ri = window.sessionStorage.getItem("AdRoomId");
  const [socketConnected, setSocketConnected] = useState(false);
  let [message, setMessage] = useState('');
  let [roomname, setRoomName] = useState('');
  let [chatlog, setChatLog] = useState([]);
  let ws = useRef(null);
  let history = useHistory();

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/adviser/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setRoomName(window.sessionStorage.getItem("AdRoomName"));
      console.log(roomname);
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  const webSocketUrl = 'ws://' + "127.0.0.1:8000" +
    '/ws/adviser/' + ri + '/' + "?token="+ token;


  // 소켓 객체 생성
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
        alert("해당 채팅방은 입장할 수 없습니다.");
        history.push('./main')
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
        alert("해당 채팅방은 입장할 수 없습니다.");
        history.push('./main')
      };
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        var messaged = data['message'];
        console.log(data);
        console.log(typeof(messaged));
        console.log(Array.isArray(chatlog));
        setChatLog((prevItems) => [...prevItems, messaged + '\n']);
      };
    }

    return () => {
      console.log("clean up");
      ws.current.close();
    };
  },[] );

  // //소켓이 연결되었을 시에 send 메소드
  // useEffect(() => {
  //   if (socketConnected) {
  //     ws.current.send(
  //       JSON.stringify({
  //         'message': '',
  //       })
  //     );

  //     setSendMsg(true);
  //   }
  // }, [socketConnected]);

  function OnSubmit(e){
        ws.current.send(JSON.stringify({
            'message': message
        }));

        setMessage('');
      }

  return (
    <div>
      <Form.Label>{roomname}</Form.Label>
      <div>socket connected : {`${socketConnected}`}</div>
      {
        chatlog.map((idx,clog)=>{
          return <div key={clog}>{idx}</div>
        })
      }
       <textarea id="chat-log" cols="100" rows="20"readOnly value={chatlog}></textarea>
       <br/>
      <input id="chat-message-input" value={message} type="text" size="100" onKeyPress={(e)=>{
                  if(e.key === 'Enter'){
                    console.log('enter');
                    OnSubmit();
                  };
                }}
                onChange={(e)=>{
                  setMessage(e.target.value);
                }}/><br/>
      <input id="chat-message-submit" type="submit" value="Send" onClick={OnSubmit}/>
      <br/>
    </div>
  );
};

export default AdChat;