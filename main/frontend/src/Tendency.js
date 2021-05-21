import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Row, Col, Form, FormGroup, Label, Input, FormText,Container,Button } from 'reactstrap';
import CNavbar from './custom_navbar';



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
    axios.post('http://127.0.0.1:8000/analysis/tendancy/',{
      answer: value.map(i=>Number(i))

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
      <br></br>
        <img src = "logo/3x/Sentio_horizontalxxhdpi.png" width="30%">
          </img>
        <br></br>
        <br></br>
        <Container>
        <FormGroup tag="fieldset" row onChange={handleRadioChange}>
        <legend className="col-form-label col-sm-2"><span id="sub_title">나는 화가 날때?</span> </legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input  value='0' type="radio" name="radio1" />{' '}
              <span id="simple_txt">차분한 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          <br></br>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio1" />{' '}
              <span id="simple_txt">스트레스 풀리는 신나는 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange2}>
        <legend className="col-form-label col-sm-2"><span id="sub_title">나는 짜증 날때?</span> </legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio2" />{' '}
              <span id="simple_txt">차분한 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          <br></br>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio2" />{' '}
              <span id="simple_txt">짜증 풀리는 신나는 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange3}>
        <legend className="col-form-label col-sm-2"><span id="sub_title">나는 행복 할때?</span> </legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio3" />{' '}
              <span id="simple_txt">차분해질수 있는 조용한 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          <br></br>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio3" />{' '}
              <span id="simple_txt">행복할땐 신나는 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <hr/>
          <FormGroup tag="fieldset" row onChange={handleRadioChange4}>
        <legend className="col-form-label col-sm-2"><span id="sub_title">나는 슬플때?</span> </legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input value='0' type="radio" name="radio4" />{' '}
              <span id="simple_txt">나를 위로해주는 슬픈 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          <br></br>
          <FormGroup check>
            <Label check>
              <Input value='1' type="radio" name="radio4" />{' '}
              <span id="simple_txt">슬픔을 날리는 신나는 음악이 좋아요!</span>
            </Label>
          </FormGroup>
          </Col>
          </FormGroup>
          <Row xs={7} id="bottom_fix" className="fixed-bottom">
          <Col>
          <Button type="submit" onClick={handleSubmit}  size="lg" block id="btn_nomal"><span id="simple_txt">완료</span></Button>
          </Col>
          </Row>
         
        </Container>
    </div>
  );
}

export default Tendency;