import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';



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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  formControl1: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
 
}));

export default function SignUp() {
  const classes = useStyles();
  let [name, setName] = useState();
  let [email,setEmail] = useState();
  let [pw,setPw] = useState();
  let [pwc, setPwc] = useState();
  let [birth, setBirth] = useState();
  let [gender, setGender] = useState();
  let [usertype, setUserType] = useState();
  let history = useHistory();

  
  

  function OnSubmit(e) {
    e.preventDefault();
    if(pw !== pwc){
      alert('비밀번호가 일치 하지 않습니다.')
    }
    axios.post('http://127.0.0.1:8000/account/rest-auth/registration/',{
      username : name,
      password1 : pw,
      password2 : pwc,
      email : email,
      gender: gender,
      birthDate: birth,
      userType : usertype,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);
      const accessToken = response.data.token;
      window.sessionStorage.setItem("Authorization",accessToken);
      
      history.push("/tendency");
    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={OnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(e)=>{
                  setName(e.target.value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{
                  setPw(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Password confirm"
                type="password"
                id="password2"
                // error={hasNotSamePw('password2')}
                // helperText={
                //   hasNotSamePw('password2') ? "입력한 비밀번호와 일치하지 않습니다." : null
                // } 
                onChange={(e)=>{
                  setPwc(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>
              Birthdate
              </InputLabel>
             <TextField
                variant="outlined"
                required
                fullWidth
                name="birthdate"
                type="date"
                id="birthdate"
                onChange={(e)=>{
                  setBirth(e.target.value);
                }}
              />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Gender"
                    required
                    onChange={(e)=>{
                  setGender(e.target.value);
                }}
                  >
                    <MenuItem value={"M"}>남성</MenuItem>
                    <MenuItem value={"F"}>여성</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid xs={12}>
                 <FormControl className={classes.formControl1}>
                  <InputLabel id="demo-simple-select-label">UserType</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    onChange={(e)=>{
                  setUserType(e.target.value);
                }}
                  >
                    <MenuItem value={"Adviser"}>상담사</MenuItem>
                    <MenuItem value={"Normal"}>일반</MenuItem>
                  </Select>
                </FormControl>
            </Grid>

          </Grid>        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={OnSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}