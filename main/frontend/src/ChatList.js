import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import CNavbar from './custom_navbar';
import {
  Container, 
  Row, 
  Col,
  Button,
} from 'reactstrap';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import PIgraph from './PIgraph';



export default function ChatList(){
  let history = useHistory();
  const [clist, setList] = useState([]);
  let [roomname, setRoomName] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [PImodalShow, setPIModalShow] = React.useState(false);
  const [maxEmotion, setMaxEmotion] = useState('');
  const [emotions, setEmotions] = useState([]);

  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;


  useEffect(()=>{
    axios.get('http://15.165.85.247:8000/chat/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setList(response.data);
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  useEffect(() => {
    axios.get('http://15.165.85.247:8000/analysis/emotion_analyze/')
    .then(function(response){
      let bool = response.data.result;
      if(!bool){
        alert('감정분석을 먼저해주세요');
        history.push('./main')
      }
      console.log(response);
      }
    )
    .catch(function(error){
      console.log(error);
    })
  },[])

  function ShowPI(idx) {
    console.log(idx)
    axios.get('http://15.165.85.247:8000/chat/chat_statistic/?room_id='+idx)
    .then(function(response){
      console.log(response.data);
      setMaxEmotion(response.data.max_emotion);
      setEmotions(response.data.emotions);
      setPIModalShow(true);
    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });
  }

  function OnGoChat(roomid,roomname) {
    console.log(roomid);
    console.log(roomname);
    window.sessionStorage.setItem("RoomId", roomid);
    window.sessionStorage.setItem("MakeRoomName", roomname);
    history.push("/chat");
  }

  function OnMakeChat(e) {
    e.preventDefault();
    if(roomname == null){
      alert("Check RoomName");
      return;
    }

    axios.post('http://15.165.85.247:8000/chat/crud/',{
      name: roomname,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      var roomid = response.data.id;
      window.sessionStorage.setItem("MakeRoomName", roomname);
      window.sessionStorage.setItem("RoomId",roomid);
      history.push("/chat");

    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });
  }


  return(
  <div>
    <CNavbar></CNavbar>
    <br></br>
    <Container>
      <Row>
        <Col id="sub_title" style={{textAlign:'left'}}>
          채팅방 목록
        </Col>
      </Row>
      <br>
      </br>
      <Row>
        <Table bordered responsive hover>
            <thead>
                <th><span id="simple_txt">NO.</span></th>
                <th><span id="simple_txt">RoomName.</span></th>
            </thead>
            <tbody>
            {
                clist.map((post, idx) => (
                  <tr key={idx}>   
                    <td id="id" 
                            ><span id="light_txt"  onClick={() => ShowPI(post.id)}>{idx+1}</span></td>
                   <td id={post.id} className="light_txt" onClick={(e)=>{
                  var roomid = e.target.id;
                  var roomname = e.target.innerText;
                  OnGoChat(roomid,roomname);
                }}>{post.name}</td>
                  </tr>
                ))
              }
            </tbody>
        </Table>
      </Row>
      <Row>
        <Col style={{textAlign:"right"}}>
        <Button variant="primary" id="btn_nomal"  onClick={() => setModalShow(true)}><strong style={{color:"black",fontSize:"1.3em",fontWeight:"2000"}}>+</strong></Button>
        </Col>
      </Row>
    </Container>
  
      <MyVerticallyCenteredModal
        show={modalShow}
        setRoomName={setRoomName}
        OnMakeChat={OnMakeChat}
        onHide={() => setModalShow(false)}
      />
      <MyPIVerticallyCenteredModal  show={PImodalShow}
      onHide={() => setPIModalShow(false)} data={maxEmotion} emotions={emotions}></MyPIVerticallyCenteredModal>

  </div>
  );
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span id="simple_txt">채팅방 만들기</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField id="roomname" label="방이름" name="roomname" onChange={(e)=>{
                  props.setRoomName(e.target.value);
                }} />
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn_nomal" onClick={props.onHide}><span id="simple_txt">취소</span></Button>
        <Button id="btn_nomal"  onClick={props.OnMakeChat}><span id="simple_txt">생성</span></Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyPIVerticallyCenteredModal(props) {
  return (
    <Modal
      
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter simple_txt">
          MAIN EMOTION: <span style={{color:"#f1a9a0"}}>{props.data}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PIgraph data={props.emotions}></PIgraph>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn_nomal" onClick={props.onHide}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}