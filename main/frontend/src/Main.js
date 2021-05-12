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
import TextField from '@material-ui/core/TextField';
import {useCookies} from 'react-cookie';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: 'left'
  },
}));

export default function Main(){
  const classes = useStyles();
  let [roomname, setRoomName] = useState();
  let [cookie, setCookie, removeCookie] = useCookies(['authorization=']);
  let history = useHistory();
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  function OnSubmit(e) {
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

  function OnChat(e) {
    e.preventDefault();
    history.push("/chatlist");
  }

  function ChaneInfo(e){
    e.preventDefault();
    history.push("/changeuserinfo");
  }

  return(
    <div className={classes.root}>
    <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Main Page
    </Typography>
    <Button color="inherit">Logout</Button>
  </Toolbar>
</AppBar>
<form className={classes.form} onSubmit={OnSubmit}>
  <TextField id="roomname" label="roomName" name="roomname" onChange={(e)=>{
                  setRoomName(e.target.value);
                }} />
  <Button type="submit" className={classes.submit} onSubmit={OnSubmit}>채팅생성</Button>
</form>
<form className={classes.form} onSubmit={OnChat}>
  <Button type="submit" className={classes.submit} onSubmit={OnChat}>채팅창리스트 보기</Button>
</form>
<button onClick={ChaneInfo}>유저정보 변경</button>
<button onClick={()=>{history.push("/diary")}}>일기</button>
<button onClick={()=>{history.push("/ctest")}}>사진 테스트</button>
<button onClick={()=>{history.push("/diarylist")}}>일기 리스트</button>


</div>
  );
}