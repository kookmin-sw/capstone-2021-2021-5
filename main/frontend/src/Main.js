import { MailRounded } from '@material-ui/icons';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
<<<<<<< HEAD
import CNavbar from './custom_navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Slide from './music_slide';
=======
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {useCookies} from 'react-cookie';
>>>>>>> 5b4e4664b9e10b2596071ded95b521206d94ea7f



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

  return(
<<<<<<< HEAD
    <React.Fragment>
    <CNavbar></CNavbar>
    <br></br>
    <Slide></Slide>
    </React.Fragment>
=======
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
</div>
>>>>>>> 5b4e4664b9e10b2596071ded95b521206d94ea7f
  );
}