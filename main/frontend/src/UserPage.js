import React, {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Container, 
  Row, 
  Col,
  Button
} from 'reactstrap';
import CNavbar from './custom_navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';



export default function UserPage(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [username, setUserName] = useState('');
  let [userImage, setUserImage] = useState('');


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/account/userinfo/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setUserName(response.data.username);
      if(response.data.image == null){
        setUserImage('svg/fi-rr-user.svg')
      }
      else{
        setUserImage('http://127.0.0.1:8000'+response.data.image);
      }
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  console.log(username);
  console.log(userImage);






  return(
    <React.Fragment>
    <Container className="themed-container" fluid="md">
    <CNavbar></CNavbar>
    <br></br>
    <Row>
    <Col>
      
    </Col>
    <Col>
      <Image className="profile_preview" src={userImage}  />
    </Col>
    <Col >
      
    </Col>
    </Row>
    <br></br>
    <Row>
    <Col>
      <span id="simple_txt">{username}님 안녕하세요.</span>
    </Col>
    </Row>
    <br>
    </br>
    <Row>
      <Col>
      <Link to="/changeuserinfo">
      <Button id="btn_block" size="lg" block>
     
        <Row>
          <Col style={{marginTop:"5px"}}><img id="icon" src="svg/fi-rr-settings.svg"/></Col>
          <Col style={{marginTop:"5px"}}><span id="light_txt">회원 정보 수정</span></Col>
        </Row>
        </Button>
        </Link>
      </Col>
    </Row>
    <br>
    </br>
    <Row>
      <Col>
      <Link to="/wheatherChart">
      <Button id="btn_block" size="lg" block>
        <Row>
          <Col style={{marginTop:"5px"}}><img id="icon" src="svg/fi-rr-cloud.svg"/></Col>
          <Col style={{marginTop:"5px"}}><span id="light_txt">날씨에 따른 내 감정</span></Col>
        </Row>
        </Button>
      </Link>
      </Col>
    </Row>
    <br>
    </br>
    <Row>
    <Col>
      <Link to="/emotionList">
      <Button id="btn_block" size="lg" block>
        <Row>
          <Col style={{marginTop:"5px"}}><img id="icon" src="svg/fi-rr-stats.svg"/></Col>
          <Col style={{marginTop:"5px"}}><span id="light_txt">감정 통계 보기</span></Col>
        </Row>
        </Button>
        </Link>
      </Col>
    </Row>
    <br>
    </br>
    <Row>
    <Col>
    <Link to="/diarylist">
      <Button id="btn_block" size="lg" block>
        <Row>
          <Col style={{marginTop:"5px"}}><img id="icon" src="svg/fi-rr-book-alt.svg"/></Col>
          <Col style={{marginTop:"5px"}}><span id="light_txt">다이어리</span></Col>
        </Row>
        </Button>
        </Link>
      </Col>
    </Row>
    <br>
    </br>
    <Row>
    <Col>
    <Link to="/main">
    <Button size="lg" id="btn_nomal"><span id="simple_txt">메인으로 돌아가기</span></Button>
    </Link>
    </Col>
    </Row>

    </Container>
    </React.Fragment>

  );
}