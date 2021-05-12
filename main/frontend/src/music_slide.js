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
    <Col></Col>
    <Col >
    <div id="slide_container">
    <div class=" container" >
    <iframe width="300" height="200" src="https://www.youtube.com/embed/COz9lDCFHjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class=" container">
    <iframe width="300" height="200" src="https://www.youtube.com/embed/COz9lDCFHjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class=" container">
    <iframe width="300" height="200" src="https://www.youtube.com/embed/COz9lDCFHjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class=" container">
    <iframe width="300" height="200" src="https://www.youtube.com/embed/COz9lDCFHjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    </div>
    </Col>
    <Col></Col>
    </Row>
    </>
  );
}

export default Slide;