import React, { useState,useCallback  } from 'react';
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


const [params, setParams] = useState({
  key:'AIzaSyBFyhTo8AXnROaRd3xXA9uZWMVz7LZIetI',
  part: 'snippet',
  q: "아이유 좋은날",
  maxResults: 1,
  type: 'video',
  videoDuration: 'long'
});


const Slide = (props) => {

 
  return (
    <>
    <Row>
    <Col id="sub_title">
    <span>오늘 당신을 위한 음악</span>
    </Col>    
    </Row>
    <br></br>
    <Row xs="1" sm="2" md="3" className="overflow-auto">
    <Col> <img className="thumbnail" src="music.jpeg"></img></Col>
    <Col>
    <img className="thumbnail" src="music.jpeg"></img>
    </Col>
    <Col> <img className="thumbnail" src="music.jpeg"></img></Col>
    </Row>
    </>
  );
}

export default Slide;