import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';




export default function ChatList(){
  let history = useHistory();
  const [clist, setList] = useState([]);

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
    history.push("/sockettest");
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

  </div>
  );
}