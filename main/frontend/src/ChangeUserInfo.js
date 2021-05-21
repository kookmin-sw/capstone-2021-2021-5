import React, {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import CNavbar from './custom_navbar';
import {
  Container, 
  Row, 
  Col,
  Button,
} from 'reactstrap';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form'
import {useHistory} from 'react-router-dom'


export default function ChangeUserInfo(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [email,setEmail] = useState('');
  let [userImage, setUserImage] = useState('');
  let [uE, setUserE] = useState('');
  let history = useHistory();
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/account/userinfo/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      if(response.data.image == null){
        setUserImage('svg/fi-rr-user.svg')
      }
      else{
        setUserImage('http://127.0.0.1:8000'+response.data.image);
      }
      setUserE(response.data.email);
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  let profile_preview = null;
   let [file, setFile] = useState('');
   let [previewURL, setPreviewURL] = useState();

   const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    if(file !== ''){
      profile_preview = <img className="profile_preview_small" src={previewURL}></img>
    }

    function OnSubmit(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("image", file);
    fd.append("email",email);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.put('http://127.0.0.1:8000/account/userinfo/',fd,config)
    .then(function (response){
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);
      history.push("/userpage");
    })
    .catch(function (error){
      // console.log(file);
      console.log(error.response);
      alert(error);
    });
  }
  

  function handleFileOnChange(event){
    event.preventDefault();
    let reader = new FileReader();
    let files = event.target.files[0];

    reader.onloadend = () => {
     setFile(files);
     setPreviewURL(reader.result);
    }
    console.log(reader.result);
    reader.readAsDataURL(files);
    
  }
  

 

  return(
    <div>
      <CNavbar>

      </CNavbar>
      <br></br>
      <br></br>
      <Row>
      <Col id="sub_title">
      <span>프로필 변경</span>
      </Col> 
      </Row>
      <br></br>
      <br></br>
      <Row>
      <Col style={{textAlign:"right",justifyContent:"right"}} xs={5}><Image className="profile_preview_small" src={userImage}   /></Col>
      <Col>
      <br></br>
      <br></br>
      <Row><Col><img id="icon" src="svg/fi-rr-arrow-right.svg"/></Col></Row>
      <Row></Row>
      </Col>
      <Col style={{textAlign:"left",justifyContent:"left"}} xs={5}>{profile_preview}</Col>
      </Row>
      <br></br>
      <Row>
        <Col> <input type='file' 
      accept='image/jpg,image/png,image/jpeg,image/gif' 
      name='profile_img' 
      onChange={handleFileOnChange}>
      </input></Col>
      </Row>
     
      <br></br>
      <br></br>
      <Row>
      <Col id="sub_title">
      <span>이메일 변경</span>
      </Col> 
      </Row>
      <br>
      </br>
      <br>
      </br>
      
      <Form.Group as={Row} controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        <span id="simple_txt">Email</span>
      </Form.Label>
      <Col xs={2}></Col>
      <Col >
        <Form.Control  placeholder={uE}
          aria-label="이메일"
          aria-describedby="inputGroup-sizing-sm"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(e)=>{
            setEmail(e.target.value);}}/>
      </Col>
      <Col xs={2}></Col>
    </Form.Group>

   
      <br></br>
      <br></br>
      <Row>
        <Col><Button type="submit" id="btn_large" onClick={OnSubmit}>변경하기</Button></Col>
      </Row>

    </div>
  );
}