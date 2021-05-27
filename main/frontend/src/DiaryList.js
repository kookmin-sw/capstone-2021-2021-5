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


export default function DiaryList() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  const [diaryList, setDiaryList] = useState([]);
  let history = useHistory();

  useEffect(()=>{
    axios.get('https://www.ksentio.com:80/diary/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setDiaryList(response.data);
      
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  

  function OnDetail(id) {
    console.log(id);
    axios.get('https://www.ksentio.com:80/diary/crud/' + id +'/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      const diary_title = response.data.title;
      const diary_content = response.data.body;
      const diary_id = response.data.id;
      window.sessionStorage.setItem("DiaryTitle",diary_title);
      window.sessionStorage.setItem("DiaryContent",diary_content);
      window.sessionStorage.setItem("DiaryId",diary_id);
      history.push('./diarydetail');      
    })
    .catch(function(error){
      console.log(error);
    })
  }

  function weather(num){
    if(num == 0){
      return "맑음";
    }
    else if(num == 1){
      return "흐림";
    }
    else if(num == 2){
      return "비";
    }
    else if(num == 3){
      return "번개";
    }
    else if(num == 4){
      return "눈";
    }
    else if(num == 5){
      return "안개";
    }
    else {
      return "광풍"
    }
  }


  return (
    <div>
    <CNavbar>

    </CNavbar>
    <Container fluid>
    <br></br>
    <br></br>
    <Row>
        <Col id="sub_title" style={{textAlign:'left'}}>
            나의 일기들
        </Col>
    </Row>
    <br></br>
    <Row>
        <Table bordered responsive hover>
            <thead>
                <th><span id="simple_txt">NO.</span></th>
                <th><span id="simple_txt">TITLE.</span></th>
                <th><span id="simple_txt">WEATHER.</span></th>
                <th><span id="simple_txt">DATE.</span></th>
            </thead>
            <tbody>
            {
                diaryList.map((post, idx) => (
                  <tr key={idx}>   
                    <td id="id" 
                            ><span id="light_txt">{idx+1}</span></td>
                    <td id={post.id} onClick={(e)=>{
                            var id = e.target.id;
                            OnDetail(id);}}><span id={post.id} className="light_txt">{post.title}</span></td>
                    <td id="weather">
                    <span id="light_txt">{weather(post.weather)}</span>
                      </td>
                    <td id="pubdate"><span id="light_txt">{post.pubdate}</span></td>
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