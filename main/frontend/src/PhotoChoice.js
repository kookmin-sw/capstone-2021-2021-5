import React, {useState, useEffect} from 'react';

import axios from "axios";
import { useHistory } from 'react-router';
import {
    Container, 
    Row, 
    Col,
    Button,
    Alert
  } from 'reactstrap';
import Card from 'react-bootstrap/Card'
import CNavbar from './custom_navbar';
import {Link} from 'react-router-dom';
  





export default function PhotoChoice() {
  





  return (
    <div>
        <CNavbar></CNavbar>
        <br></br>
        <br></br>
        <Container fluid>
        <Row>
            <Col id="sub_title" >
                어떤 감정분석을 하시겠나요?
            </Col>
        </Row>
        <br></br>
        <Alert color="danger">
            <p>1. 아이폰은 사파리 브라우저, 안드로이드폰은 크롬 브라우저를 이용해 주세요.</p>
            <br /> 
            <p>2. 얼굴이 정확하게 분석될 수 있도록 올바른 사진과 카메라를 정확히 응시후 촬영해주세요.</p>
        </Alert>
       
        <br></br>
        <Row>
        <Col>
            <Card border="danger" >
            <Card.Header id="simple_txt">기존사진</Card.Header>
                <Card.Body>
                <Card.Title>
                    <Link to="/photo" id="link">
                    기존사진을 <br></br>감정분석
                    </Link>
                    </Card.Title>
                </Card.Body>
            </Card>
            <br />
        </Col>
        <Col>
            <Card border="danger" >
            <Card.Header id="simple_txt">현재사진</Card.Header>
                <Card.Body>
                <Card.Title>
                    <Link to="/ctest" id="link">
                    실시간으로<br></br> 감정분석
                    </Link>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
        </Row>
      
        </Container>
    </div>
  );
}