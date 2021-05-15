import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: 'left'
  },
}));

export default function ChatList(){
  const classes = useStyles();
  let history = useHistory();
  const [clist, setList] = useState([
    // id: '',
    // name: '',
  ]);
  const {id, name} = clist;

  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/chat/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      console.log(response.data[0]);
      for(let i in response.data){
        setList({...clist, id: response.data[i].id, name: response.data[i].name});
      }
      // setList({...clist, id:response.data[0].id, name:response.data[0].name});
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  console.log(clist);


  return(
    <div className={classes.root}>
    <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Chat List
    </Typography>
    <Button color="inherit">Logout</Button>
  </Toolbar>
</AppBar>
 {/* {
            //반복문을 쓸때는 key를 써주도록 강요한다.
            clist.map(function(i){
              return (
                <div className="list" key={i}>
                  <p>{clist[i].id}</p>
                  <p>{clist[i].name}</p>
                  <hr/>
                </div>
              )
            })
          } */}
<div>
<label>{clist}</label>
<hr></hr>
</div>


</div>
  );
}