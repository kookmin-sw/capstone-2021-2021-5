import React, { useState,useEffect } from "react";
import ImageUploader from "react-images-upload";
import axios from 'axios';
import CNavbar from "./custom_navbar";
import {
  Container, 
  Row, 
  Col,
  Button,
} from 'reactstrap';
import Form from 'react-bootstrap/Form'
import {useHistory} from 'react-router-dom'




export default function Photo(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
   let profile_preview = null;
   let [file, setFile] = useState('');
   let [previewURL, setPreviewURL] = useState();
   const [lat, setLat] = useState(null);
   const [lng, setLng] = useState(null);
   const [status, setStatus] = useState(null);
   let history = useHistory();

  
 
   
   //현재 위치 가져오기
   const getLocation = () => {
     if (!navigator.geolocation) {
       setStatus('Geolocation is not supported by your browser');
     } else {
       setStatus('Locating...');
       navigator.geolocation.getCurrentPosition((position) => {
         setStatus(null);
         setLat(position.coords.latitude);
         setLng(position.coords.longitude);
 
       }, () => {
         setLat(37.5665);
        setLng(126.9780);
       });
     }
   }

   useEffect(()=>
  {
    getLocation();
  },[]);
 

   const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    if(file !== ''){
      profile_preview = <img id="picture" src={previewURL}></img>
    }

    function OnSubmit(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("image", file);
    fd.append("axis",[lat,lng]);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.post('https://ksentio.com/analysis/emotion_analyze/',fd,config)
    .then(function (response){
      console.log(response.data.token);
      const emotions =response.data.emotions;
      const musics = response.data.musics;
      const picture = response.data.image;
      console.log(emotions);
      console.log(musics);
      console.log(picture);
      window.sessionStorage.setItem("emotions",JSON.stringify(emotions));
      window.sessionStorage.setItem("musics",JSON.stringify(musics));
      window.sessionStorage.setItem("picture",picture);
      history.push("/emotionResult");
    })
    .catch(function (error){
      // console.log(file);
      console.log(error.response);
      alert('감정분석이 완료되지않았습니다.');
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
      <CNavbar></CNavbar>
      <br></br>
      <br></br>
      <Container>
      <Row>
      <Col>
      <Form>
      <Form.File 
        id="custom-file-translate-scss"
        label="이미지를 넣어주세요."
        lang="en"
        type='file' 
        accept='image/jpg,image/png,image/jpeg,image/gif' 
        name='profile_img' 
        onChange={handleFileOnChange}
        custom
        data-browse="파일 선택"
      />
      </Form>
      </Col>   
      </Row>
      <br></br>
      <br></br>
      <Row>
        <Col>{profile_preview}</Col>
      </Row>
      <br></br>
        <Row xs={7} id="bottom_fix" className="fixed-bottom">
          <Col>
          <Button
          type="submit"
          onClick={OnSubmit}
          size="lg" block id="btn_nomal">
            <span id="simple_txt">감정 분석 결과보기</span>
          </Button>
          </Col>
        </Row>
      </Container>
      {/* <input type='file' 
      accept='image/jpg,image/png,image/jpeg,image/gif' 
      name='profile_img' 
      onChange={handleFileOnChange}>
      </input> */}
      
    </div>
  );
}