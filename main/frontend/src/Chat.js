import React, {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


export default function Chat(){
  const token = window.sessionStorage.getItem("Authorization");
  // axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [roomname, setRoomName] = useState();
  let [message, setMessage] = useState('');
  let [chatlog, setChatLog] = useState([]);

 


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


  const chatSocket = new WebSocket(
    'ws://' + "127.0.0.1:8000" +
    '/ws/chat/' + roomname + '/' + "?token="+token);
        

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var messaged = data['message'];
        console.log(data)
        var narr = [...chatlog];
        narr.push(messaged + '\n');
        setChatLog(narr);
    };
    

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    
    function OnSubmit(e){
        chatSocket.send(JSON.stringify({
            'message': message
        }));

        setMessage('');
      }
  

  return(
    <div>
      <textarea id="chat-log" cols="100" rows="20" value={chatlog} readOnly></textarea><br/>
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
      <Form.Label>{roomname}</Form.Label>
    </div>
  );
}