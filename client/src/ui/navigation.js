import './navigation.css';
import React,{useEffect} from "react";
import { Link ,useNavigate    } from 'react-router-dom';
import {signout} from '../actions/authactions';
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn} from '../actions/authactions';
import { FaFacebookMessenger ,FaUserAlt,FaHome ,FaCalendarWeek} from "react-icons/fa";

const Navigation=(props)=>{

const dispatch = useDispatch();
const auth = useSelector((state) => state.auth);
const {user :userred}=auth;
let navigate  = useNavigate ();


const logout=(props)=>{
	
	dispatch(signout());
	
   
   navigate('/signin');
}

	return (
	<div className="mainbodywrapper">
		<div className="homewrapper"> 
			<div className="nav">

				<div className="logowrapper" >
				{auth.loggedin? <Link to={"/feed"} style={{paddingLeft:"20px"}}><p><FaHome/><span className="navsections">Home</span></p></Link> :null }
					{auth.loggedin?	<div className="leftlinkwrapper"><Link to={"/userdetails"} ><p> <FaUserAlt/><span className="navsections"> {userred.firstName} Profile</span></p></Link></div> :null }
				</div>
				<div className="linkwrapper">
			{!auth.loggedin?<><Link to={"/signin"}><div>Sign in</div></Link><Link to={"/signup"}><div>Sign up</div></Link></> :null
			}
			{auth.loggedin? 
			<>
			<Link to={`/posts/${userred._id}`}><div><FaCalendarWeek/></div></Link>
			<Link to={"/chats"}><div><FaFacebookMessenger/></div></Link>
		
			</> :null}
			
			{auth.loggedin? <div  onClick={logout} style={{cursor: "pointer",}}>Sign out</div> : null}
				</div>
				
			</div>
			{props.children}
			
		</div>
	</div>	
	);
}

export default Navigation;
