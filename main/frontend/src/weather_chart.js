
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CNavbar from './custom_navbar';
import React, {useState,useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import {
    Container, 
    Row, 
    Col,
    Button
  } from 'reactstrap';
import Chart from './ChartPage';
import { Link } from 'react-router-dom';


export default function WeatherChart() {
    const [key, setKey] = useState('0');
    const [emotions, setEmotions] = useState('');
    const [emo,setEmo] = useState('');
    const token = window.sessionStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = "jwt " + token;
    function selk(k){
        setKey(k);
        console.log(k);
        axios.get('http://127.0.0.1:8000/analysis/emotion_statistic/?weather='+k)
        .then(function (response){
            setEmotions(response.data.emotions);
            console.log(emotions);
            let chart =<div id="Chart_Col">
            <Row>
                <Col id="Chart_Col">
                   <Chart data={emotions}></Chart>
                </Col>
            </Row>
        </div>;
            setEmo(chart);
        })
        .catch(function(error){
            console.log(error);
            let chart = <><br></br><br></br><Row><Col><span id="simple_txt">해당날씨에 감정분석 데이터가 없습니다.</span></Col></Row></>;
            setEmo(chart);
        })
        
    }
  
    return (
    <>
    
    <CNavbar></CNavbar>
      <Container className="themed-container" fluid>
        <Row >
            <Col>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => selk(k)}
                    defaultActiveKey={0}
                    className="overflow-auto"
                >
                    <Tab eventKey="0" title="맑음">
                    {emo}
                    </Tab>
                    <Tab eventKey="1" title="흐림">
                     {emo}
                    </Tab>
                    <Tab eventKey="2" title="비" >
                     {emo}
                    </Tab>
                    <Tab eventKey="3" title="번개" >
                     {emo}
                    </Tab>
                    <Tab eventKey="4" title="눈" >
                     {emo}
                    </Tab>
                    <Tab eventKey="5" title="안개" >
                     {emo}
                    </Tab>
                    <Tab eventKey="6" title="강풍" >
                     {emo}
                    </Tab>
                </Tabs>
            </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row>
        <Col>
        <Link to="/main">
        <Button size="lg" id="btn_nomal"><span id="simple_txt">메인으로 돌아가기</span></Button>
        </Link>
        </Col>
        </Row>
      </Container>
      </>
    );
  }
