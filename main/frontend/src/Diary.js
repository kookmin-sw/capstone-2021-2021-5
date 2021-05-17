import React, {useState,useEffect} from 'react';

import axios from "axios";
import { useHistory } from 'react-router';
import CNavbar from './custom_navbar';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'
import {
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';
import Form from 'react-bootstrap/Form'



export default function Diary() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  let[title, setTitle] = useState('');
  let[content, setContent] = useState('');
  let history = useHistory();

 

  function OnSubmit(e) {
    e.preventDefault();

    if(title == ''){
      alert("제목을 입력하세요");
      return
    }
    if(content == ''){
      alert("내용을 입력하세요");
      return
    }


    axios.post('http://127.0.0.1:8000/diary/crud/',{
      title: title,
      body: content,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      history.push("/main");
    })
    .catch(function (error){
      console.log(error.response);
      alert(error);
    });
  }




  return (
    <div>
      <CNavbar></CNavbar>
      <Container>
        <br></br>
        <br></br>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column xs={2}>
            제목:
          </Form.Label>
          <Col xs={10}>
            <Form.Control type="text" onChange={(e)=>{
                  setTitle(e.target.value);
                }} />
          </Col>
        </Form.Group>
        <br></br>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column xs={2}>
            내용:
          </Form.Label>
          <Col xs={10}>
            <Form.Control as="textarea" rows={20} onChange={(e)=>{
                  setContent(e.target.value);
                }}/>
          </Col>
        </Form.Group>
        <Row xs={7} id="bottom_fix" className="fixed-bottom">
        <Col>
        <Button size="lg" block id="btn_nomal"  type="sunmit"
          onClick={OnSubmit}><span id="simple_txt">작성완료</span></Button>
        </Col>
        </Row>
        </Form>
      </Container>
    </div>
   
  );
}