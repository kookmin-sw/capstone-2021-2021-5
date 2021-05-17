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

  const musics = props.data;
  const urls = musics.map((music)=>  <div class=" container" >
  <iframe width="300" height="200" src={music.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>);
  return (
    <>
    <Row xs="1" sm="2" md="3" className="overflow-auto">
    <Col></Col>
    <Col >
    <div id="slide_container">
    {urls}
    </div>
    </Col>
    <Col></Col>
    </Row>
    </>
  );
}

export default Slide;