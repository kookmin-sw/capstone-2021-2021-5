import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';


export default function ChangeUserInfo(){
  const token = window.sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "jwt " + token;
  let [email,setEmail] = useState('');


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
    fd.append("email",email);
    for (let value of fd.values()) {
    console.log(value);
    }
    axios.put('http://127.0.0.1:8000/account/userinfo/',fd,config)
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
      <label>프로필 변경</label>
      <div>
      {profile_preview}
      </div>
      <div>
      <input type='file' 
      accept='image/jpg,image/png,image/jpeg,image/gif' 
      name='profile_img' 
      onChange={handleFileOnChange}>
      </input>
      </div>
      <label>이메일 변경</label>
      <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              />
      <button type="submit" onClick={OnSubmit}>변경하기</button>

    </div>
  );
}