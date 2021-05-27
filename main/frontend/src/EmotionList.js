import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import CNavbar from './custom_navbar';
import {
    Container, 
    Row, 
    Col,
    Button
  } from 'reactstrap';
  import Table from 'react-bootstrap/Table'


export default function EmotionList() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  const [emotionList,setEmotionList] = useState([]);
  let history = useHistory();

  function getEmoList (){
    axios.get('https://www.ksentio.com:80/analysis/emotion_histroy/')
    .then(function(response){
      console.log(response.data)
      let emos = response.data
      setEmotionList(emos.reverse());
      
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("기록된 감정이 없습니다.")
    })
  }

  useEffect(()=>{
    getEmoList();
  },[]);

  function OnDetail(id){
      console.log(id);
      axios.post('https://www.ksentio.com:80/analysis/emotion_histroy/',{
          pk:id
      })
      .then(function(response){
        console.log(response.data);
        let result = response.data;
        window.sessionStorage.setItem("result",JSON.stringify(result));
        history.push('/emotionDetail');
      })
      .catch(function(error){
          console.log(error);
      })
  }
  
  return (
    <div>
    <CNavbar></CNavbar>
    <Container fluid>
    <br></br>
    <br></br>
    <Row>
        <Col id="sub_title" style={{textAlign:'left'}}>
            당신의 기록들
        </Col>
    </Row>
    <br></br>
    <Row>
        <Table bordered responsive hover>
            <thead>
                <th><span id="simple_txt">NO.</span></th>
                <th><span id="simple_txt">DATE.</span></th>
            </thead>
            <tbody>
            {
                
                emotionList.map((emotion, idx) => (
                    <tr key={idx}>   
                    <td id="id">{idx+1}</td>
                    <td id={emotion.id} onClick={(e)=>{
                             var id = e.target.id;
                             OnDetail(id);}}
                     >{emotion.pubdate}</td>
                    </tr>
                ))
             }
            </tbody>
        </Table>
    </Row>
    </Container>

    </div>
  );
}