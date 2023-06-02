import React, { useState,useEffect } from "react";
 const Rightsidebar=()=>{
return(
    <>
     <div className="right">
                <div className="messages">
                    <div className="heading">
                        <h4>Messages</h4><i className="uil uil-edit"></i>
                    </div>
                    
                    <div className="search-bar">
                        <i className="uil uil-search"></i>
                        <input type="search" placeholder="Search messages" id="message-search"/>
                    </div>
                    
                     <div className="category">
                         <h6 className="active">Primary</h6>
                         <h6>General</h6>
                         <h6 className="message-request">Requests(7)</h6>
                     </div>
                   
                     <div className="message">
                         <div className="profile-photo">
                             <img src="./images/pro4.jpg" alt=""/>
                             <div className="active"></div>
                         </div>
                         <div className="message-body">
                             <h5>Adam Wade</h5>
                             <p className="text-muted">Hurry up man</p>
                         </div>
                     </div>
                    
                     <div className="message">
                        <div className="profile-photo">
                            <img src="./images/pro1.jpg" alt=""/>
                        </div>
                        <div className="message-body">
                            <h5>Nathaliya Cruz</h5>
                            <p className="text-muted">How u doing ?</p>
                        </div>
                    </div>
                    
                    <div className="message">
                        <div className="profile-photo">
                            <img src="./images/pro3.jpg" alt=""/>
                        </div>
                        <div className="message-body">
                            <h5>Steve Wayne</h5>
                            <p className="text-muted">Call me !!</p>
                        </div>
                    </div>
                   
                    <div className="message">
                        <div className="profile-photo">
                            <img src="./images/pro1.jpg" alt=""/>
                        </div>
                        <div className="message-body">
                            <h5>Martin Keller</h5>
                            <p className="text-muted">Tommorow right ?</p>
                        </div>
                    </div>
                   
                    <div className="message">
                        <div className="profile-photo">
                            <img src="./images/pro3.jpg" alt=""/>
                        </div>
                        <div className="message-body">
                            <h5>Nathan Anderson</h5>
                            <p className="text-muted">I will be right back</p>
                        </div>
                    </div>
                   
                    <div className="message">
                        <div className="profile-photo">
                            <img src="./images/pro6.jpg" alt=""/>
                        </div>
                        <div className="message-body">
                            <h5>David Seaman</h5>
                            <p className="text-muted">Where are u?</p>
                        </div>
                    </div>

                    
                </div>

                 
                  <div className="friend-requests">
                    <h4>Request</h4>
                    <div className="request">
                        <div className="info">
                            <div className="profile-photo">
                                <img src="./images/pro1.jpg" alt=""/>
                            </div>
                        </div>
                        <div>
                            <h5>James Waugh</h5>
                            <p className="text-muted">
                                  8 mutual friends
                            </p>
                            
                        </div>
                        <div className="action">
                            <button className="btn btn-primary" >Accept</button>
                            <button className="btn" >Decline</button>
                        </div>
                    </div>

                    <div className="request">
                        <div className="info">
                            <div className="profile-photo">
                                <img src="./images/pro3.jpg" alt=""/>
                            </div>
                        </div>
                        <div>
                            <h5>Frank Rose</h5>
                            <p className="text-muted">
                                  1 mutual friends
                            </p>
                            
                        </div>
                        <div className="action">
                            <button className="btn btn-primary" >Accept</button>
                            <button className="btn" >Decline</button>
                        </div>
                    </div>

                    <div className="request">
                        <div className="info">
                            <div className="profile-photo">
                                <img src="./images/pro5.jpg" alt=""/>
                            </div>
                        </div>
                        <div>
                            <h5>Nika Bier</h5>
                            <p className="text-muted">
                                  4 mutual friends
                            </p>
                            
                        </div>
                        <div className="action">
                            <button className="btn btn-primary" >Accept</button>
                            <button className="btn">Decline</button>
                        </div>
                    </div>

                </div>
            </div>
    </>
);

}
export default Rightsidebar;
