import React, { useState  } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container, 
  Row, 
  Col 
} from 'reactstrap';

import axios from 'axios';



export default function EmotionResult(){
    const emotions = window.sessionStorage.getItem("emotions");
    const musics = window.sessionStorage.getItem("musics");
    const picture = window.sessionStorage.getItem("picture");
    const resultImg = 'http://127.0.0.1:8000'+picture
    console.log(picture);
 
  return (
    <>
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
    </>
  );

}


