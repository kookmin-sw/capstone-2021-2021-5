import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { useHistory } from 'react-router';

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