import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import CNavbar from './custom_navbar';
import {
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';
import {
  Link, useHistory
} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import $ from "jquery";

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


  function OnSubmit(e){
        ws.current.send(JSON.stringify({
            'message': message
        }));
        var mydiv = $("#chatroom");
        mydiv.scrollTop(mydiv.prop("scrollHeight"));  
        setMessage('');
      }

  return (
    <div>
      <CNavbar></CNavbar>
      <br></br>
      <Container>
      <Row>
        <Col style={{textAlign:"left"}}>
        <Link to="/chatlist">
     <img id="icon" src="svg/fi-rr-arrow-left.svg"/>
     </Link>
     </Col>
     </Row>
     <br></br>
     <Row>
       <Col id="sub_title">ROOMNAME. {roomname}</Col>
     </Row>
      <br></br>
      <Row>
      <div id="chatroom">
        {
          chatlog.map((idx,clog)=>{
            return <><br></br><Row ><Col key={clog}><span id="simple_txt">{idx}</span></Col></Row></>
          })
        }
      </div>
      </Row>
      <br></br>
      <Row>
        <Col>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon2"
          value={message} type="text" onKeyPress={(e)=>{
            if(e.key === 'Enter'){
              console.log('enter');
              OnSubmit();
            };
          }}
          onChange={(e)=>{
            setMessage(e.target.value);
          }}
        />
        <InputGroup.Append>
        <Button type="submit" id="btn_large" onClick={OnSubmit}><span id="light_txt">SEND</span></Button>
        </InputGroup.Append>
      </InputGroup>
        </Col>
      </Row>
      </Container>

      
    </div>
  );
};

export default AdChat;