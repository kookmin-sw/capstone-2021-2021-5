import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Main from './Main.js';
import Tendency from './Tendency';
import UserPage from './UserPage';
import ChatList from "./ChatList";
import Chat from "./Chat";
import Photo from "./Photo";
import ChangeUserInfo from "./ChangeUserInfo";
import Diary from "./Diary";
import Ctest from "./Ctest";
import DiaryList from "./DiaryList";
import { Reset } from 'styled-reset';
import EmotionResult from './emotionResult';
import WeatherChart from "./weather_chart";
import DiaryDetail from "./DiaryDetail";
import AdChat from "./AdChat";
import AdChatList from "./AdChatList";
import EmotionList from './EmotionList';
import EmotionDetail from './EmotionDetail';
import DiaryEdit from './DiaryEdit';
import PhotoChoice from './PhotoChoice';
import TendencyChange from "./TendencyChange";
import Cnav from "./custom_navbar";


function App() {
  return (
    <div className="App">
    <Reset/>
    <CookiesProvider>
    <Route exact path="/"> 
      <SignIn />
    </Route>
    <Route path="/SignUp">
      <SignUp />
    </Route>
    <Route path="/main" >
        <Main>
          <Cnav />
        </Main>
    </Route>
    <Route path="/tendency">
      <Tendency />
    </Route>
    <Route path="/userpage">
      <UserPage />
    </Route>
    <Route path="/chatlist">
      <ChatList />
    </Route>
    <Route exact path="/chat"> 
      <Chat />
    </Route>
    <Route path="/photo">
      <Photo />
    </Route>
    <Route path="/changeuserinfo">
      <ChangeUserInfo />
    </Route>
    <Route path="/diary">
      <Diary />
    </Route>
    <Route path="/ctest">
      <Ctest />
    </Route>
    <Route path="/diarylist">
      <DiaryList />
    </Route>
    <Route path="/emotionResult">
        <EmotionResult/>
    </Route>
    <Route path="/wheatherChart">
        <WeatherChart/>
    </Route>
    <Route path="/diaryDetail">
      <DiaryDetail />
    </Route>
    <Route  exact path="/adchat">
      <AdChat />
    </Route>
    <Route exact path="/adchatlist">
      <AdChatList />
      </Route>
    <Route exact path="/tendency_change">
      <TendencyChange />
      </Route>
    <Route path="/emotionList">
        <EmotionList></EmotionList>
    </Route>
    <Route path="/emotionDetail">
        <EmotionDetail></EmotionDetail>
    </Route>
    <Route path="/diaryEdit">
        <DiaryEdit></DiaryEdit>
    </Route>
    <Route path="/photoChoice">
        <PhotoChoice></PhotoChoice>
    </Route>
    </CookiesProvider>
    </div>
  );
}

export default App;
