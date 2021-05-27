import React, {useState, useEffect} from 'react';

import axios from "axios";
import { useHistory } from 'react-router';
import {
    Container, 
    Row, 
    Col,
    Button
  } from 'reactstrap';
  import Form from 'react-bootstrap/Form'
import CNavbar from './custom_navbar';
  





export default function DiaryEdit() {
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

  function OnModify(e) {
    console.log(id);
    e.preventDefault();

    if(title == ''){
      alert("제목을 입력하세요");
      return
    }
    if(content == ''){
      alert("내용을 입력하세요");
      return
    }


    axios.put('https://www.ksentio.com:80/diary/crud/' + id + '/',{
      title: title,
      body: content,
    })
    .then(function (response){
      alert("수정완료");
      const diary_title = response.data.title;
      const diary_content = response.data.body;
      const diary_id = response.data.id;
      window.sessionStorage.setItem("DiaryTitle",diary_title);
      window.sessionStorage.setItem("DiaryContent",diary_content);
      window.sessionStorage.setItem("DiaryId",diary_id);
      history.push("/diaryDetail");
    })
    .catch(function (error){
      
      alert(error.detail);
    });
  }




  return (
    <div>
        <CNavbar></CNavbar>
        <Container fluid>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column xs={2}>
            TITLE:
          </Form.Label>
          <Col xs={10}>
            <Form.Control type="text" value={title} onChange={(e)=>{
                  setTitle(e.target.value);
                }} />
          </Col>
        </Form.Group>
        <br></br>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column xs={3}>
            CONTENT:
          </Form.Label>
          <Col xs={9}>
            <Form.Control value={content} as="textarea" rows={20} onChange={(e)=>{
                  setContent(e.target.value);
                }}/>
          </Col>
        </Form.Group>
        <Row xs={7} id="bottom_fix" className="fixed-bottom">
        <Col>
        <Button size="lg" block id="btn_nomal"  type="sunmit"
          onClick={OnModify}><span id="simple_txt">수정완료</span></Button>
        </Col>
        </Row>
        </Form>
        </Container>
    </div>
  );
}