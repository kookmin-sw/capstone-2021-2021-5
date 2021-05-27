import React, {useState, useEffect} from 'react';
import CNavbar from './custom_navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Slide from './music_slide';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import Chart from './ChartPage';
import { Link } from 'react-router-dom';
import {
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';
import { useHistory } from 'react-router';
import { LaptopWindowsOutlined } from '@material-ui/icons';





export default function Main(){
  const history = useHistory();
  const token = window.sessionStorage.getItem("Authorization");
  const [emo,setEmo] = useState('');
  const [rm,setRm] = useState('');
  const [userType, setUserType] = useState(false);
  const [maxEmo, setMaxEmo] = useState();
  const musics = JSON.parse(window.sessionStorage.getItem("musics"));
  console.log(musics)
  let musicslide ='';
  let randomMusic = '';
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  function getEmotions(){
    axios.post('https://ksentio.com/analysis/emotion_statistic/')
    .then(function(response){
      let emotions = response.data.emotions;
      let max_emotions = response.data.max_emotion;
      console.log(max_emotions);
      setMaxEmo(max_emotions);
      window.sessionStorage.setItem("emotions",JSON.stringify(emotions));
      // window.sessionStorage.setItem("max_emotins",JSON.stringify(max_emotions));
      let chart =<div id="Chart_Col">
      <Row>
          <Col id="Chart_Col">
             <Chart data={emotions}></Chart>
          </Col>
      </Row>
      </div>;
      setEmo(chart);
    })
    .catch(function (error){
      let chart = 
      <Row>
      <Col id="simple_txt">
      <span id="warning">감정 데이터가 충분하지 않습니다.</span>
      </Col>    
      </Row>
       setEmo(chart);
       setMaxEmo('중립');
      console.log(error);
    });
  }
  function getRandomMusics(){
    if(musics==null){
      axios.get('https://ksentio.com/analysis/random_music/')
    .then(function(response){
      let random = response.data.musics;
      window.sessionStorage.setItem("randomMusic",JSON.stringify(randomMusic));
    
      musicslide = <Slide data={random}></Slide>;
      setRm(musicslide);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  else{
      musicslide = <Slide data={musics}></Slide>;
      setRm(musicslide);
  }
  }

  function getUserType(){
    axios.post('https://ksentio.com/analysis/data_injection/')
    .then(function(response){
      console.log(response.data.result);
      const type = response.data.result;
      setUserType(type);
      }
    )
    .catch(function(error){
      console.log(error);
    })
  }

  useEffect(() => {
    getUserType();
    getEmotions();
    getRandomMusics();
    console.log(maxEmo);
    console.log(userType);
  },[])

   useEffect(() => {
    axios.get('https://ksentio.com/analysis/tendancy/')
    .then(function(response){
      let bool = response.data.exist;
      if(!bool){
        alert('성향분석을 먼저해주세요');
        history.push('./tendency')
      }
      console.log(response);
      }
    )
    .catch(function(error){
      console.log(error);
    })
  },[])

  

  return(
    <React.Fragment>
    <Container className="themed-container" fluid>
    <CNavbar maxEmo={maxEmo} userType={userType}></CNavbar>
    <br></br>
    <br></br>
    <Row>
    <Col id="sub_title">
    <span>오늘 당신을 위한 음악</span>
    </Col>    
    </Row>
    <br></br>
    {rm}
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
    <Link to="/photoChoice"><Button size="lg" block id="btn_nomal"><span id="simple_txt">감정분석</span></Button></Link>
    </Col>
    </Row>
    </Container>
    </React.Fragment>
  );
}