import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';



export default function DiaryList() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  const [diaryList, setDiaryList] = useState([]);
  let history = useHistory();

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/diary/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data);
      setDiaryList(response.data);
      
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  

  function OnDetail(id) {
    console.log(id);
    axios.get('http://127.0.0.1:8000/diary/crud/' + id +'/')
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




  return (
    <div>
    <table>
      <th>Diary_idx</th>
      <th>Diary_title</th>
      <th>Diary_weather</th>
      <th>Diary_date</th>
        {
      diaryList.map((post, idx) => (
        <tr key={idx}>   
          <td id="id" onClick={(e)=>{
                  var id = e.target.innerText;
                  OnDetail(id);}}
                  >{post.id}</td>
          <td id="title">{post.title}</td>
          <td id="weather">{post.weather}</td>
          <td id="pubdate">{post.pubdate}</td>
        </tr>
      ))
    }
    </table>

  </div>
  );
}