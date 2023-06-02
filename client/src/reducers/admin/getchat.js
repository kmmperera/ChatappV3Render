const initState = {

	chats:[],
	error:null,
}
const pushtoarray=(a,n)=>{

return a.push(n);
}
const getchats= (state = initState, action) => {
	switch (action.type) {
	case "getchatssuccess":
            state = {
               			...state,
				error:null,
				chats:action.payload.chats,
				
				
            }
            break;

	case "getchatsfailed":
            state = {
               			...state,
				error:action.payload.error,
				
				
            }
            break;

	case "newmessage":
		//const newchats =pushtoarray(chats,action.payload.newmessage);
		// let newchats=[...chats,action.payload.newmessage];
		//let newmessage=action.payload.notification;
            state = {
               			...state,
				chats :action.payload.localchat,
			//	chats:chats.push(action.payload.newmessage),
			//	chats:newchats,
			//	chats:["this is a test","yeah"],
			//chats:[...state.chats ,{
			//	message :"from reducer",
			//	sender:"99999",
			//	reciever:"00000000000"
			//	}
			//],	
				
            }
            break;

	default:
		state={...state,}



	}
return state;
}
export default getchats;
