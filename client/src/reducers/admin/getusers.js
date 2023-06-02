const initState = {

	users:[],
	error:null,
	suggestions:{},
	userbyid:[],
	updatedUser:{},
	userafterpicupdated:{},
	inbox:[],
	
}

const getusers= (state = initState, action) => {
	switch (action.type) {
	case "getallusersuccess":
            state = {
               ...state,
				users:action.payload.users,
				
				
            }
            break;

	case "getalluserfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;
			
	case "friendsuggestionssuccess":
            state = {
               ...state,
				suggestions :action.payload.friendsuggestions,
				
				
            }
            break;		
	case "friendsuggestionsfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;
			
	case "getusersuccess":
            state = {
               ...state,
				userbyid:action.payload.user,
				
				
            }
            break;

case "getuserfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;
case "followsuccess":
            state = {
               ...state,
				updatedUser:action.payload.updatedUser,
				suggestions:{...state.suggestions ,...action.payload.updatedUser}
				
            }
            break;
case "followfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;
case "unfollowsuccess":
		
            state = {
               ...state,
				updatedUser:action.payload.updatedUser,
				suggestions:{...state.suggestions ,...action.payload.updatedUser}
				
				
            }
            break;
case "unfollowfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;			

case "changeprofiepicsuccess":
            state = {
               ...state,
				userafterpicupdated:action.payload.updatedUser,
				
				
            }
            break;	
			
case "changeprofiepicfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;				
case "getinboxsuccess":
            state = {
               ...state,
				inbox:action.payload.inbox[0].inbox,
				
				
            }
            break;		
case "getinboxfailed":
            state = {
               ...state,
				error:action.payload.error,
				
				
            }
            break;					


	}
return state;
}
export default getusers;
