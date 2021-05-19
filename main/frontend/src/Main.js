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
  const [emo,setEmo] = useState('');
  const [rm,setRm] = useState('');
  const musics = JSON.parse(window.sessionStorage.getItem("musics"));
  let musicslide ='';
  let randomMusic = '';
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  function getEmotions(){
    axios.post('http://127.0.0.1:8000/analysis/emotion_statistic/')
    .then(function(response){
      let emotions = response.data.emotions;
      window.sessionStorage.setItem("emotions",JSON.stringify(emotions));
      let chart =<div id="Chart_Col">
      <Row>
          <Col id="Chart_Col">
             <Chart data={emotions}></Chart>
          </Col>
      </Row>
      </div>;
      setEmo(chart);
      console.log(emotions);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  function getRandomMusics(){
    if(musics==null){
      axios.get('http://127.0.0.1:8000/analysis/random_music/')
    .then(function(response){
      let random = response.data.musics;
      window.sessionStorage.setItem("randomMusic",JSON.stringify(randomMusic));
      musicslide = <Slide data={random}></Slide>;
    })
    .catch(function (error){
      console.log(error);
    });
  }
  else{
      musicslide = <Slide data={musics}></Slide>;
  }
  }

  useEffect(() => {
    getEmotions();
    getRandomMusics();
  },randomMusic)

  

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
    {emo}
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