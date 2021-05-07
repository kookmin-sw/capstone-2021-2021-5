import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/kookmin-sw/capstone-2021-5">
        Kookmin University Capstone 5조
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn()  {
  const classes = useStyles();
  let [username, setEmail] = useState();
  let [pw, setPw] = useState();
  let history = useHistory();

  const Check = (user) =>{
    return fetch('http://127.0.0.1:8000/account/rest-auth/login/',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json());
  };

  const OnSubmit = async(e) =>{
    e.preventDefault();
    if(!username || !pw){
      return;
    }
    try{
      const response = await Check({
        username : username,
        password: pw
      });
      if(response.token && response.user){
        console.log(response);
        console.log(response.user);
        console.log(response.token);
        const accessToken = response.token;
        window.sessionStorage.setItem("Authorization",accessToken);
        alert("login suc")
        history.push("/main");
      }
      else{
        throw new Error(response.error);
      }
    }
    catch(err){
      alert('Fail Login');
      setEmail('');
      setPw('');
      console.log(err);
    }
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          <img src = "logo/3x/Sentio_horizontalxxhdpi.png" width="70%">
          </img>
        </Typography>
        <br></br>
        <form className={classes.form} noValidate onSubmit={OnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            color="secondary"
            label="아이디"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>{
                  setEmail(e.target.value);
                }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            color="secondary"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{
                  setPw(e.target.value);
                }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={OnSubmit}
            id="btn_large"
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
             
            </Grid>
            <Grid item>
              <Link id="link" href="/SignUp" variant="body2">
                {"회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Alt(){
  return(
  <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    This is a success alert — <strong>check it out!</strong>
  </Alert>
  )
}