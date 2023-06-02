import landing2 from '../images/landing2.svg';


const Landingpage=(props)=>{
	return (
		<main>
 <div className="landing-container">
     <div className="landing-upper">
     <div className="landing-left">
        <div className="svg-container">
            <img src={landing2} alt="" />
        </div>
     </div>
     <div className="landing-right">
        <div className="features">
            <div className="feature">
                    <h3 >Create an account</h3>
                    <p>Register by filling sign up form</p>
            </div>
            <div className="feature">
                    <h3 >Make posts </h3>
                    <p>Users are allowed to post and delete own posts </p>
            </div>
            <div className="feature">
                    <h3 >Comment on posts</h3>
                    <p>Users are allowed to comment and delete own comments</p>
            </div>
            <div className="feature">
                    <h3 >Find friends</h3>
                    <p>Search for friends & follow them </p>
            </div>
            <div className="feature">
                    <h3 >Chat with friends</h3>
                    <p>Start a conversation by sending a message .Users can do real time chat</p>
            </div>
           
            
        </div>
     </div>
    </div>
    <div className="landing-bottom">
        <h1 className="joinus ">Try it</h1>
        <p className="description-para text-muted">
           This is not an end product by any means.This is a demo app to demonstrate some features.
        </p>
    </div>
 </div>
</main>
	)
}

export default Landingpage;












 