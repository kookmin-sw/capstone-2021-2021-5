import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import axios from 'axios';


export default function Photo(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
   let profile_preview = null;
   let [file, setFile] = useState('');
   let [previewURL, setPreviewURL] = useState();

   const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    if(file !== ''){
      profile_preview = <img className='profile_preview' src={previewURL}></img>
    }

    function OnSubmit(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append("image", file);
    fd.append("answer",[1,1,2]);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.post('http://127.0.0.1:8000/analysis/emotion_analyze/',fd,config)
    .then(function (response){
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);
    })
    .catch(function (error){
      // console.log(file);
      console.log(error.response);
      alert(error);
    });
  }

  function handleFileOnChange(event){
    event.preventDefault();
    let reader = new FileReader();
    let files = event.target.files[0];

    reader.onloadend = () => {
     setFile(files);
     setPreviewURL(reader.result);
    }
    console.log(reader.result);

    reader.readAsDataURL(files);
  }

  


  return(
    <div>
      <div>
      {profile_preview}
      </div>
      <input type='file' 
      accept='image/jpg,image/png,image/jpeg,image/gif' 
      name='profile_img' 
      onChange={handleFileOnChange}>
      </input>
      <button type="submit" onClick={OnSubmit}>submit</button>
    </div>
  );
}