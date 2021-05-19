import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';




export default function ChatList(){
  let history = useHistory();
  const [clist, setList] = useState([]);
  let [roomname, setRoomName] = useState();
  const [modalShow, setModalShow] = React.useState(false);


  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/crud/')
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

  function OnGoChat(roomname) {
    console.log(roomname);
    window.sessionStorage.setItem("MakeRoomName", roomname);
    history.push("/chat");
  }

  function OnMakeChat(e) {
    e.preventDefault();
    if(roomname == null){
      alert("Check RoomName");
      return;
    }

    axios.post('http://127.0.0.1:8000/chat/crud/',{
      name: roomname,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      document.cookie = 'authorization=' + token + ';'
      window.sessionStorage.setItem("MakeRoomName", roomname);
      history.push("/chat");

    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });
  }


  return(
  <div>
    <table>
      <th>Room_Id</th>
      <th>Room_Name</th>
        {
      clist.map((post, idx) => (
        <tr key={idx}>   
          <td>{post.id}</td>
          <td onClick={(e)=>{
                  var roomname = e.target.innerText;
                  OnGoChat(roomname);
                }}>{post.name}</td>
        </tr>
      ))
    }
    </table>
    <Button variant="primary" onClick={() => setModalShow(true)}>
        채팅창 생성
      </Button>

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
          채팅창 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField id="roomname" label="roomName" name="roomname" onChange={(e)=>{
                  props.setRoomName(e.target.value);
                }} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.OnMakeChat}>Make</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
