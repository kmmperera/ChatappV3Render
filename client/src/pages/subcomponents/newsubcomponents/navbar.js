import React, { useState, useEffect } from "react";
import pro3 from '../../../images/pro3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { signout } from '../../../actions/authactions';
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { user: userred } = auth;
    let navigate = useNavigate();


    const logout = (props) => {

        dispatch(signout());


        navigate('/signin');
    }
    return (
        <>

            <nav>
                <div className="container">
                <Link to={"/feed"}>
                    <h2 className="log">
                        ChatMe
            </h2>
            </Link>
            { auth.loggedin? 
                    <div className="search-bar">
                        <i className="uil uil-search"> </i>
                        <input type="search" placeholder="Search for friends" />
                    </div> :null
                }   
                    {auth.loggedin? 
                    <div className="create">
                        <label onClick={logout} className="btn btn-primary" htmlFor="create-post">Logout</label>

                        <div className="profile-photo">
                        <Link style={{textDecoration:"none"}} to={`/posts/${userred._id}`}>   <img src={userred.pofilePicture ? userred.pofilePicture: pro3} alt="" /></Link>
                        </div>
                    </div> :<div className="signinsignup"><Link to={"/signin"}><div className="btn btn-primary">Sign in</div></Link><Link to={"/signup"}><div className="btn ">Sign up</div></Link></div> }
                </div>
            </nav>

        </>
    );

}
export default Navbar;
