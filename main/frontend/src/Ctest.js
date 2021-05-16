import React, {useRef, useState, useEffect} from "react";
import Webcam from "react-webcam";
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {
  Container, 
  Row, 
  Col ,
  Button
} from 'reactstrap';
import CNavbar from "./custom_navbar";
import emotionResult from "./emotionResult";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
    margin: theme.spacing(1),
    display: 'block',
  },
  img:{
    display: 'block',
  },
  video:{
    display: 'block',
  }
  },
}));

export default function Ctest(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let history = useHistory();
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  
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
        setStatus('Unable to retrieve your location');
        alert('위치를 알 수 없습니다.')
      });
    }
  }

  useEffect(()=>
  {
    getLocation();
  },[]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

   function OnSubmit(e) {
    e.preventDefault();
    let file = dataURLtoFile(imgSrc, "photo.jpeg");
    let fd = new FormData();
    fd.append("image", file);
    fd.append("axis",[lat,lng]);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.post('http://127.0.0.1:8000/analysis/emotion_analyze/',fd)
    .then(function (response){
      console.log(response.data.token);
      const emotions =response.data.emotions;
      const musics = response.data.musics;
      const picture = response.data.image;
      console.log(emotions);
      console.log(musics);
      console.log(picture);
      window.sessionStorage.setItem("emotions",emotions);
      window.sessionStorage.setItem("musics",musics);
      window.sessionStorage.setItem("picture",picture);
      history.push("/emotionResult");
    })
    .catch(function (error){
      // console.log(file);
      console.log(error.response);
      alert("사진이 올바르지 않습니다.");
    });
  }
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}



  return (
    <div>
      <CNavbar></CNavbar>
      <Container>
        <br></br>
        <Row>
          <Col> 
          <Webcam
                mirrored={true}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="300"
                />
           </Col>
        </Row>
        <br></br>
        <Row>
        <Col><Button id="btn_block" onClick={capture}>사진 촬영</Button></Col>
        </Row>
        <br></br>
        <Row>
        <Col> {imgSrc && (<img id="picture" src={imgSrc}/>)}</Col>
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
    </div>
  );
}

