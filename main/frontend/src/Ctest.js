import React, {useRef, useState} from "react";
import Webcam from "react-webcam";
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from "axios";

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

  const classes = useStyles();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

   function OnSubmit(e) {
    e.preventDefault();
    let file = dataURLtoFile(imgSrc, "photo.jpeg");
    let fd = new FormData();
    fd.append("image", file);
    fd.append("answer",[1,1,2]);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.post('http://127.0.0.1:8000/analysis/emotion_analyze/',fd)
    .then(function (response){
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);
    })
    .catch(function (error){
      // console.log(file);
      console.log(error.response);
      alert(error);
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
      <Webcam
      mirrored={true}
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
        {imgSrc && (<img src={imgSrc}/>)}
        <div>
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
        </div>
    </div>
  );
}

