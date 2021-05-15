import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CNavbar from './custom_navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Slide from './music_slide';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {useCookies} from 'react-cookie';
import Chart from './ChartPage';
import { Link } from 'react-router-dom';
import {
  
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';


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
    <React.Fragment>
    <Container className="themed-container" fluid>
    <CNavbar></CNavbar>
    <br></br>
    <br></br>
    <Slide></Slide>
    <br></br>
    <br></br>
    <Row>
    <Col id="sub_title">
    <span>최근 당신의 감정</span>
    </Col>  
    </Row>
    <br></br>
    <br></br>
    <div id="Chart_Col">
    <Row >
    <Col id="Chart_Col">
    <Chart></Chart>
    </Col>
    </Row>
    </div>
    <Row xs={7} id="bottom_fix" className="fixed-bottom">
    <Col>
    <Link to="/ctest"><Button size="lg" block id="btn_nomal"><span id="simple_txt">감정분석</span></Button></Link>
    </Col>
    </Row>
    </Container>
    </React.Fragment>
  );
}