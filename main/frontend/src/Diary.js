import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { useHistory } from 'react-router';
import CNavbar from './custom_navbar';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
    margin: theme.spacing(1),
  },
  },
}));

export default function Diary() {
  const classes = useStyles();
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  let[title, setTitle] = useState('');
  let[content, setContent] = useState('');
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
        setStatus('Unable to retrieve your location');
      });
    }
  }

 
  const getWheather = () => {
    axios.post(`http://api.openweathermap.org/data/2.5/weather?lat=37.5594532&lon=126.8554393&appid=6accb9bfc78c7f11c54c7b6c51c9ca26`)
    .then(function (response){
        console.log(response)
    })
    .catch(function (error){
      console.log(error.response);
      alert(error);
    });
  } 
 

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
      <CNavbar>

      </CNavbar>
      <br></br>
      <br></br>
      <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <button onClick={getWheather}>getWheather</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="title" label="일기 제목" variant="outlined" onChange={(e)=>{
                  setTitle(e.target.value);
                }} />
        <br></br>
        <textarea id="content" rows="5" cols="33" onChange={(e)=>{
                  setContent(e.target.value);
                }}>
        </textarea>
        <br></br>
         <Button
          type="sunmit"
          onClick={OnSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          send
        </Button>
      </form>
    </div>
  );
}