
import React,{useEffect} from "react";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";
import PrivateRoute from "./pages/redirect";
import Userdetails from "./pages/userdetails";
import { Route, Routes  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn} from './actions/authactions';
import Workhours from "./pages/workhours";
import Allusers from "./pages/admin/allusers";
import Chats from "./pages/admin/chats";
import Profile from "./pages/admin/profile";
import Feed from "./pages/admin/feed";
import Post from "./pages/admin/post";
import Posts from "./pages/admin/posts";
import Testbed from "./pages/testingbed";
import Suggestions from "./pages/admin/suggestions";

import {getallusers} from './actions/admin/getuseractions';
function App() {
	
	const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

  useEffect(() => {
   
      dispatch(isUserLoggedIn());
    	// dispatch(getallusers());
  }, []);

useEffect(() => {
	if(auth.user.firstName != ""){
   localStorage["user"]=JSON.stringify(auth.user);
    }
  }, [auth.user]);

  return (
  <div className="App">
           <Routes >
		   <Route exact path="/" element={<Home/>} />
		   <Route exact path="/signin" element={<PrivateRoute><Signin/></PrivateRoute>} />
		   <Route exact path="/signup" element={<PrivateRoute><Signup/></PrivateRoute>} />
		   <Route exact path="/userdetails" element={<Userdetails/>} />
		   <Route exact path="/workdetails" element={<Workhours/>} />
		   <Route exact path="/allusers" element={<Allusers/>} />
		   <Route exact path="/chats" element={<Chats/>} />
		   <Route exact path="/profile/:id" element={<Profile/>} />
		   <Route exact path="/post/:pid" element={<Post/>} />
		   <Route exact path="/posts/:uid" element={<Posts/>} />
		   <Route exact path="/testbed" element={<Testbed/>} />

		   <Route exact path="/feed" element={<Feed/>} />
		   <Route exact path="/suggestions" element={<Suggestions/>} />



		   </Routes >
  </div>
  );
}

export default App;
