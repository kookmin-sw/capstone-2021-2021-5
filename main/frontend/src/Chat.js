import React, { useEffect, useState} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import axios from 'axios';

// 하위 컴포넌트
import Messages from "./Messages/Messages";
import RoomInfo from "./RoomInfo/RoomInfo";
import Input from "./Input/Input";

// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


function Chat() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [room, setRoom] = useState('');


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setRoom(response);
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);



    // var chatSocket = new WebSocket(
    //     'ws://' + "127.0.0.1:8000" +
    //     '/ws/chat/' + room + '/');
        

    // chatSocket.onmessage = function(e) {
    //     var data = JSON.parse(e.data);
    //     var message = data['message'];
    //     document.querySelector('#chat-log').value += (message + '\n');
    // };

    // chatSocket.onclose = function(e) {
    //     console.error('Chat socket closed unexpectedly');
    // };

    // // document.querySelector('#chat-message-input').focus();
    // document.querySelector('#chat-message-input').onkeyup = function(e) {
    //     if (e.keyCode === 13) {  // enter, return
    //         document.querySelector('#chat-message-submit').click();
    //     }
    // };

    // document.querySelector('#chat-message-submit').onclick = function(e) {
    //     var messageInputDom = document.querySelector('#chat-message-input');
    //     var message = messageInputDom.value;
    //     chatSocket.send(JSON.stringify({
    //         'message': message
    //     }));

    //     messageInputDom.value = '';
    // };
 

  // return <h1>Chat</h1>;
  // 1.roominfo
  // 2.messages
  // 3.input
  return (
    <div className="chatOuterContainer">
     <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
    <input id="chat-message-input" type="text" size="100"/><br/>
    <input id="chat-message-submit" type="button" value="Send"/>
    </div>
  );
};

export default Chat;