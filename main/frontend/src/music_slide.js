import React, { useState } from 'react';
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


const Slide = (props) => {
 
  return (
    <Container>
    <Row>
    <Col id="sub_title">
    <span>오늘 당신을 위한 음악</span>
    </Col>    
    </Row>
    <br></br>
    <Row xs="1" sm="2" md="3">
    <Col></Col>
    <Col>
    <img className="thumbnail" src="music.jpeg"></img>
    </Col>
    <Col></Col>
    </Row>
    </Container>
  );
}

export default Slide;