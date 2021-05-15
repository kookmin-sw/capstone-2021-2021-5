import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Input } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';


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

export default function UserPage(){
  const classes = useStyles();
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [username, setUserName] = useState('');


  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/account/userinfo/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setUserName(response.data.username);
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  console.log(username);







  return(
    <div className={classes.root}>
    <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      User Page
    </Typography>
    <Button color="inherit">Logout</Button>
  </Toolbar>
  </AppBar>

  <Grid>
    <Input type="text" value={username}></Input>
  </Grid>

</div>
  );
}