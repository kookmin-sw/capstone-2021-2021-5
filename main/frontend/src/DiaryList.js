import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';



export default function DiaryList() {
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;

  let[title, setTitle] = useState([]);
  let[content, setContent] = useState([]);
  let[date, setDate] = useState([]);
  let[id,setId] = useState([]);
  let history = useHistory();

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/diary/crud/')
    .then(function(response){
      console.log(response);
      console.log(response.data[0]);
      console.log(response.data[0].pubdate);
      console.log(response.data[0].title);
      console.log(response.data[0].body);
      for (var idx in response.data){
        date.push(response.data[idx].pubdate);
        title.push(response.data[idx].title);
        content.push(response.data[idx].body);
        id.push(response.data[idx].id);
      }
      console.log(date);
      console.log(title);
      console.log(content);
      
      // alert("Succ");
    })
    .catch(function(error){
      console.log(error);
      alert("fail")
    })
  },[]);

  function OnRead(e) {
    e.preventDefault();

    axios.get('http://127.0.0.1:8000/diary/crud/' + id +'/',{
    })
    .then(function (response){
      console.log(response);
      history.push("/main");
    })
    .catch(function (error){
      console.log(error.response);
      alert(error);
    });
  }

  function OnModify(e) {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/diary/crud/',{
      title: title,
      body: content,

    })
    .then(function (response){
      console.log(response);
      console.log(response.data);
      history.push("/main");
    })
    .catch(function (error){
      console.log(error.response);
      alert(error);
    });
  }




  return (
    <div>
      <div>Diary List</div>
      <br></br>

      {
        id.map(function(id,date,content,title,idx){
          return(
            <div key={idx}>
            <div>
              <label>{title}</label>
              </div>
              <div>
              <label>{date}</label>
              </div>
              <div>
              <textarea readOnly value={content}></textarea>
              </div>
              <button onClick={OnRead}>열람</button>
              <button>수정</button>
              </div>
                        )
        })
      }

      {/* <form>
        <div>
        <label>{title}</label>
        </div>
        <div>
        <label>{date}</label>
        </div>
        <div>
        <textarea readOnly value={content}></textarea>
        </div>
        <button onClick={OnRead}>열람</button>
        <button>수정</button>
      </form> */}
      
    </div>
  );
}