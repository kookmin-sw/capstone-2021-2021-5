import React, {useState, useEffect} from 'react';

import axios from "axios";
import { useHistory } from 'react-router';
import CNavbar from './custom_navbar';
import Chart from './ChartPage';
import Slide from './music_slide';
import { Link } from 'react-router-dom';
import {
    Container, 
    Row, 
    Col,
    Button
  } from 'reactstrap';


export default function EmotionDetail() {
 
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  const result = JSON.parse(window.sessionStorage.getItem("result"));

  let[date, setDate] = useState('');
  let[resultImg, setResultImg] = useState('');
  let[emotions, setEmotions] = useState('');
  let[musics,setMusics] = useState('');
  let history = useHistory();

  const getResult = ()=>{
    console.log(result);
    setDate(result.pubDate);
    setResultImg('http://15.165.85.247:8000'+result.image);
    setEmotions(result.emotions);
    let urls = result.musics.map((music)=>  <div class=" container" >
    <iframe width="300" height="200" src={music.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>);
    setMusics(urls);
  }

  

  useEffect(()=>{
    getResult();
    
  },[]);

  

  



  return (
    <div>
        <CNavbar>
        </CNavbar>
        <Container fluid>
        <br></br>
        <br></br>
        <Row>
        <Col id="sub_title" style={{textAlign:'left'}}>
            {date} 나의 기록
        </Col>
        </Row>
        <br></br>
        <Row xs="1" sm="2" md="3" className="overflow-auto">
        <Col><img id="picture" src={resultImg}/></Col>
        <Col >
        </Col>
        <Col></Col>
        </Row>
        <div id="Chart_Col">
        <Row>
        <Col id="Chart_Col">
        <Chart data={emotions}></Chart>
        </Col>
        </Row>
        </div>
        <br></br>
        <Row>
        <Col id="sub_title" style={{textAlign:'left'}}>
        <span>그날 당신을 위한 음악</span>
        </Col>    
        </Row>
        <br></br>
        <Row xs="1" sm="2" md="3" className="overflow-auto">
        <Col></Col>
        <Col >
        <div id="slide_container">
        {musics}
        </div>
        </Col>
        <Col></Col>
        </Row>
        <Row>
        <Col>
        <Link to="/emotionList">
        <Button size="lg" id="btn_nomal"><span id="simple_txt">돌아가기</span></Button>
        </Link>
        </Col>
        </Row>
        </Container>
    </div>
  );
}