import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function Tendency() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState(false);
  let history = useHistory();
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;



  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/analysis/tendancy/',{
      answer: [parseInt(value)],

    })
    .then(function (response){
      console.log(response);
      history.push("/main");
    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">성향 분석 퀴즈</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="1" control={<Radio />} label="슬플때 슬픈 음악" />
          <FormControlLabel value="2" control={<Radio />} label="슬플땐 기쁜 음악" />
        </RadioGroup>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          분석하기
        </Button>
      </FormControl>
    </form>

    </div>
  );
}

export default Tendency;