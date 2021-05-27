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



export default function AdChatList(){
  let history = useHistory();
  const [clist, setList] = useState([]);
  let [roomname, setRoomName] = useState('');
  const [userType, setUserType] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);


  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;


  useEffect(()=>{
    axios.get('https://www.ksentio.com:80/chat/adviser/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setList(response.data);
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  useEffect(()=>{
    axios.post('https://www.ksentio.com:80/analysis/data_injection/')
    .then(function(response){
      console.log(response.data.result);
      const type = response.data.result;
      console.log(type);
      if(type == true){
        let t =  <Button variant="primary" id="btn_nomal"  onClick={() => setModalShow(true)}><strong style={{color:"black",fontSize:"1.3em",fontWeight:"2000"}}>+</strong></Button>;
        setUserType(t);
      }
      else{
        let t =  ""
        setUserType(t);
      }
      }
    )
    .catch(function(error){
      console.log(error);
    })
  },[]);

  function OnGoChat(roomid,roomname) {
    console.log(roomid);
    console.log(roomname);
    window.sessionStorage.setItem("AdRoomId", roomid);
    window.sessionStorage.setItem("AdRoomName", roomname);
    history.push("/adchat");
  }

  function OnMakeChat(e) {
    e.preventDefault();
    if(roomname == null){
      alert("Check RoomName");
      return;
    }

    axios.post('https://www.ksentio.com:80/chat/adviser/',{
      name: roomname,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      var roomid = response.data.id;
      window.sessionStorage.setItem("AdRoomName", roomname);
      window.sessionStorage.setItem("AdRoomId",roomid);
      history.push("/adchat");

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
          상담채팅방 목록
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
                            ><span id="light_txt" >{idx+1}</span></td>
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
        {userType}
        </Col>
      </Row>
    </Container>
  
      <MyVerticallyCenteredModal
        show={modalShow}
        setRoomName={setRoomName}
        OnMakeChat={OnMakeChat}
        onHide={() => setModalShow(false)}
      />
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
