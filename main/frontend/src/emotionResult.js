import React, { useState  } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container, 
  Row, 
  Col,
  Button,
  
} from 'reactstrap';
import axios from 'axios';
import CNavbar from './custom_navbar';
import Chart from './ChartPage';
import Slide from './music_slide';
import { Link } from 'react-router-dom';


export default function EmotionResult(){
    const emotions = JSON.parse(window.sessionStorage.getItem("emotions"));
    const musics = JSON.parse(window.sessionStorage.getItem("musics"));
    const picture = window.sessionStorage.getItem("picture");
    const resultImg = 'https://ksentio.com'+picture
    console.log(picture);
    console.log(emotions);
    console.log(musics);
  return (
    <>
    <CNavbar></CNavbar>
    <br></br>
    <Row>
    <Col id="sub_title">
    <span>감정 분석 결과</span>
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
    <Col id="sub_title">
    <span>오늘 당신을 위한 음악</span>
    </Col>    
    </Row>
    <br></br>
    <Slide data={musics}></Slide>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Row xs={7} id="bottom_fix" className="fixed-bottom">
    <Col>
    <Link to="/diary"><Button size="lg" block id="btn_nomal"><span id="simple_txt">일기쓰기</span></Button></Link>
    </Col>
    </Row>
    </>
  );

}


