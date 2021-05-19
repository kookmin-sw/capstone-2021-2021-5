import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';




export default function AdChatList(){
  let history = useHistory();
  const [clist, setList] = useState([]);
  let [roomname, setRoomName] = useState('');
  const [userType, setUserType] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);


  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/adviser/')
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
    axios.post('http://127.0.0.1:8000/analysis/data_injection/')
    .then(function(response){
      console.log(response.data.result);
      
      const type = response.data.result;
      console.log(type);
      if(type == true){
        let t =  <Button  variant="primary" onClick={() => setModalShow(true)} >
        채팅창 생성
      </Button>;
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

    axios.post('http://127.0.0.1:8000/chat/adviser/',{
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
    <table>
      <th>Room_Id</th>
      <th>Room_Name</th>
        {
      clist.map((post, idx) => (
        <tr key={idx}>   
          <td>{post.id}</td>
          <td id={post.id} onClick={(e)=>{
                  var roomid = e.target.id;
                  var roomname = e.target.innerText;
                  OnGoChat(roomid,roomname);
                }}>{post.name}</td>
        </tr>
      ))
    }
    </table>
    {userType}

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
