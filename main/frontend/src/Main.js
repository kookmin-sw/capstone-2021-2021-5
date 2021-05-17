import React, {useState, useEffect} from 'react';
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
  let emotions = '';
  const musics = JSON.parse(window.sessionStorage.getItem("musics"));
  let musicslide ='';
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  function getEmotions(){
    axios.post('http://127.0.0.1:8000/analysis/emotion_statistic/')
    .then(function(response){
      emotions = response.data.emotions;
      window.sessionStorage.setItem("emotions",JSON.stringify(emotions));
    })
    .catch(function (error){
      console.log(error);
    });
  }
  

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
  getEmotions();
  emotions = JSON.parse(window.sessionStorage.getItem("emotions"));
 
  if(musics==null){
      musicslide = <Row><Col id="sub_title">감정분석 <span id="warning">미완료.</span></Col></Row>;
  }
  else{
      musicslide = <Slide data={musics}></Slide>;
  }

  return(
    <React.Fragment>
    <Container className="themed-container" fluid>
    <CNavbar></CNavbar>
    <br></br>
    <br></br>
    <Row>
    <Col id="sub_title">
    <span>오늘 당신을 위한 음악</span>
    </Col>    
    </Row>
    <br></br>
    {musicslide}
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
    <Chart data={emotions}></Chart>
    </Col>
    </Row>
    </div>
    <br></br>
    <br></br>
    <Row xs={7} id="bottom_fix" className="fixed-bottom">
    <Col>
    <Link to="/ctest"><Button size="lg" block id="btn_nomal"><span id="simple_txt">감정분석</span></Button></Link>
    </Col>
    </Row>
    </Container>
    </React.Fragment>
  );
}