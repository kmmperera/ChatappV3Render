import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {sendnotifications} from '../../actions/admin/notifications';


const MessageBox=(props)=>{
	
	const auth = useSelector((state) => state.auth);
	const {user: userred}=auth;
	const[message,setMessage]=useState("");
	const[reciever,setReciever]=useState("");

	const dispatch = useDispatch();
	
	const sendNoti=()=>{
		if(message != "" &&  reciever != "" && userred._id  != "" ){
	let notifiction={message:message,reciever:reciever,sender:userred._id};
	
	 dispatch(sendnotifications(notifiction));
	setMessage("");
		}
	}
	
	
		
	 useEffect(() => {
	setReciever(props.reciever);
  }, [props.reciever ]);	
	
	
	return (
	<>
	
		
		 <div style={{}}><input type="text"   name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}/></div>
		 <div style={{}}><input type="submit" value="SEND" onClick={sendNoti}/></div>
		
	
	
	</>
	
	);
}

export default MessageBox;
