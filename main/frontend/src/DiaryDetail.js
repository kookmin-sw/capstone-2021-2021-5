import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import CNavbar from './custom_navbar';
import {
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


export default function DiaryDetail() {
  
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  let[title, setTitle] = useState('');
  let[content, setContent] = useState('');
  let[id, setId] = useState('');
  let history = useHistory();

  useEffect(()=>{
    const diary_title = window.sessionStorage.getItem("DiaryTitle");
    const diary_content = window.sessionStorage.getItem("DiaryContent");
    const diary_id = window.sessionStorage.getItem("DiaryId");
    setTitle(diary_title);
    setContent(diary_content);
    setId(diary_id);
  },[]);

 
  return (
    <div>
      <CNavbar></CNavbar>
      <br></br>
      <Container>
      <Row>
        <Col style={{textAlign:"left"}}>
        <Link to="/diarylist">
     <img id="icon" src="svg/fi-rr-arrow-left.svg"/>
     </Link>
     </Col>
     </Row>
      <br></br>
      <br></br>
        <Row>
          <Col id="simple_txt" xs={4}>TITLE : </Col>
          <Col id="light_txt">{title}</Col>
        </Row>
        <hr></hr>
        <Row>
          <Col id="simple_txt" xs={5}>CONTENT : </Col>
          <Col id="light_txt" >{content}</Col>
        </Row>
        <Row xs={7} id="bottom_fix" className="fixed-bottom">
        <Col>
        <Link to="/diaryEdit">
        <Button size="lg" block id="btn_nomal"  
        ><span id="simple_txt">수정하기</span></Button>
        </Link>
        </Col>
        </Row>
      </Container>
    </div>
  );
}