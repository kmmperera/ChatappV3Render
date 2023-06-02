const initState = {
signin:false,
authenticating:false,
error:null,
loggedin:false,
signup:false,
user:{
	firstName: '',
    lastName: '',
    email: '',
	role:'',
	pofilePicture:'',
	_id:'',
	following: [],
	followers: [],
	inbox:[]
        
	},
	token:null,
	followerss:[],
}
let following =[];
let newuser ={};
 const auth=(state = initState, action) => {
	switch (action.type) {
	case "authenticating":
            state = {
                ...state,
                authenticating: true,
				error:null,
				loggedin:false,
            }
            break;

	case "loginsuccess":
            state = {
                ...state,
		user:action.payload.user,
		
                authenticating: false,
				error:null,
				loggedin:true,
				token:action.payload.token,
            }
			
            break;

	case "loginfailed":
            state = {
                ...state,
		        error:action.payload.error,
		
            }
            break;
	case "updatesuccess":
	state = {
                ...state,
				user:action.payload.user,
                
            }
            break;
	case "updatefailed":
	state = {
                ...state,
		        error:action.payload.error,
		
            }
            break;
	case "logout":
		state={
			
			...initState,
		}
	break;
	case "signupsuccess":
		state={
			
			...initState,
			signup:true,
			
		}
	break;
	case "signupfailed":
		state={
			
			...initState,
		 error:action.payload.error,
		}
	break;
	
	case "addAFollower":
	following = [...state.user.following, action.payload.followingid];
	newuser = {...state.user , following };
		state={
			
			...state,
		 user:newuser,
		 loggedin:true,
		}
	break;
	
	case "removeAFollower":
	let removedfollower = action.payload.followingid;
	 following=state.user.following.filter((f)=>{ return f != removedfollower });
	 newuser={...state.user , following};
		state={
			
			...state,
		 user:newuser,
		 loggedin:true,
		}
	break;
	
default:
		state={...state,}
	
	

	}
return state;
}
export default auth;
