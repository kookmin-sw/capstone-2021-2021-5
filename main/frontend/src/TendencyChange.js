import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function TendencyChange() {
  const classes = useStyles();
  const [value, setValue] = React.useState([]);
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);

  
  let history = useHistory();
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;



  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setQ1(event.target.value);
  };
  const handleRadioChange2 = (event) => {
    console.log(event.target.value);
    setQ2(event.target.value);
  };
  const handleRadioChange3 = (event) => {
    console.log(event.target.value);
    setQ3(event.target.value);
  };
  const handleRadioChange4 = (event) => {
    console.log(event.target.value);
    setQ4(event.target.value);
  };

  const handleSubmit = (event) => {
    value.push(q1);
    value.push(q2);
    value.push(q3);
    value.push(q4);
    console.log(value.map(i=>Number(i)));
    event.preventDefault();
    axios.put('http://127.0.0.1:8000/analysis/tendancy/',{
      answer: value.map(i=>Number(i))

    })
    .then(function (response){
      console.log(response);
      history.push("/userpage");
    })
    .catch(function (error){
      console.log(error);
      alert(error);
    });

  };

  return (
    <div>
         <FormGroup tag="fieldset" row onChange={handleRadioChange}>
        <legend className="col-form-label col-sm-2">나는 화가 날때 </legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input  value='0' type="radio" name="radio1" />{' '}
              차분한 음악
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio1" />{' '}
              신나는 음악
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange2}>
        <legend className="col-form-label col-sm-2">나는 짜증 날때</legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio2" />{' '}
              차분한 음악
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio2" />{' '}
              신나는 음악
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange3}>
        <legend className="col-form-label col-sm-2">나는 행복 할때</legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio3" />{' '}
              차분한 음악
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio3" />{' '}
              행복한 음악
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange4}>
        <legend className="col-form-label col-sm-2">나는 슬플때</legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio4" />{' '}
              차분한 음악
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio4" />{' '}
              행복한 음악
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <Button type="submit" onClick={handleSubmit} variant="outlined" color="primary" className={classes.button}>
          분석하기
        </Button>

      
    </div>
  );
}

export default TendencyChange;