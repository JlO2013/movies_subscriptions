import React from 'react';
import { Route, Routes } from "react-router-dom";
import MoviesPageComp from "./Movies/MoviesPage";
import MoviesComp from "./Movies/AllMovies";
import MovieComp from "./Movies/Movie";
import EditMovieComp from "./Movies/EditMovie";
import AddMovie from "./Movies/AddMovies";
import MembersPage from "./Members/MembersPage";
import MembersComp from "./Members/Members";
import MemberComp from "./Members/Member";
import EditMemberComp from "./Members/EditMember";
import AddMember from "./Members/AddMember";
import SubscriptionsByMovID from "./Subscriptions/SubscriptionsByMovID";
import SubscriptionsByMemberID from "./Subscriptions/SubscriptionsByMemberID";
import LoginComp from './Login/login';
import './App.css'



function MainPage() {
  return (
    <div>
    <div className="App">
        <h1>Movies - Subscriptions Web Site</h1>
        <br/>
        
        <br/>
        </div>
        <Routes>
            <Route path='/' element={<LoginComp />} />
          <Route path="/MembersPage" element={<MembersPage />} >
            <Route path="/MembersPage/Members" element={<MembersComp/>}/>
          </Route>
          <Route path="/MoviesPage" element={<MoviesPageComp />} >
            <Route path="/MoviesPage/Movies" element={<MoviesComp />} />
          </Route>
          <Route path="/SubscriptionByMovie" element={<SubscriptionsByMovID/>} />
          <Route path="/MoviesPage/Movie/:id" element={<MovieComp />} />
          <Route path="/MoviesPage/editMovie/:id" element={<EditMovieComp />}/>
          <Route path="/SubscriptionByMember" element={<SubscriptionsByMemberID/>} />
          <Route path="/MembersPage/editMember/:id" element={<EditMemberComp />}/>
          <Route path="/MembersPage/Member/:id" element={<MemberComp/>}/>   
          <Route path="/AddMovie" element={<AddMovie />} />
          <Route path="/AddMember" element={<AddMember />} />
        </Routes>
    </div>
  );
}

export default MainPage;


