const initState = {

	workdetails=[],
}

export default (state = initState, action) => {
	switch (action.type) {
	case "getuserworksuccess":
            state = {
               
				workdetails:action.payload.workdetails,
				
            }
            break;

	


	}
return state;
}