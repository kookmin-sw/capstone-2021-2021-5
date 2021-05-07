import React, {useState} from 'react';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useCookies } from 'react-cookie';

export default function Chat(){
  const token = window.sessionStorage.getItem("Authorization");
  // axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [roomname, setRoomName] = useState();
  let [message, setMessage] = useState();
  let [chatlog, setChatLog] = useState();
  document.cookie = 'authorization=' + token;

 


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
        '/ws/chat/' + roomname + '/');
        

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var messaged = data['message'];
        setChatLog(messaged + '\n');
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
      <textarea id="chat-log" cols="100" rows="20">{chatlog}</textarea><br/>
      <input id="chat-message-input" type="text" size="100" onFocus onKeyUp={(e)=>{
                  if(e.key === 13){
                    OnSubmit();
                  };
                }}
                onChange={(e)=>{
                  setMessage(e.target.value);
                }}/><br/>
      <input id="chat-message-submit" type="button" value="Send" onClick={(e)=>{OnSubmit()}}/>
      <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>{roomname}</Form.Label>
      <br></br>
      <Form.Control as="textarea" cols="100" rows={20} />
      </Form.Group>
      <TextareaAutosize aria-label="minimum height" cols="100" rowsMin={20} />
    </div>
  );
}