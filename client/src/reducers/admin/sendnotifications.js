const initState = {

	notifictions:[],
	error:null,
}

const sendnotifications= (state = initState, action) => {
	switch (action.type) {
	case "sendnotificationssuccess":
            state = {
               
				notifictions:action.payload.notifictions,
				
				
            }
            break;

	case "sendnotificationfailed":
            state = {
               
				error:action.payload.error,
				
				
            }
            break;


	}
return state;
}
export default sendnotifications;
