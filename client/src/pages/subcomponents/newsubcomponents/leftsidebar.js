import React, { useState, useEffect } from "react";
import noone from '../../../images/noone.jpg';
import pro3 from '../../../images/pro3.jpg';
import { pro1, pro2, pro4, pro5, pro6, post1, post2, post3, post4, post5 } from './imageloader';
import { notifications } from './databaseobj';

const Leftsidebar = () => {
    return (
        <>
            <div className="left">

                <a className="profile">

                    <div className="profile-photo">

                        <img src={pro3} alt="" />

                    </div>
                    <div className="handdle">
                        <h4>User One</h4>
                        <p className="text-muted">
                            @user_one
                         </p>
                    </div>
                </a>
                <div className="sidebar">
                    <a className="menu-item active">
                        <span><i className="uil uil-home"></i></span><h3>Home</h3>
                    </a>
                    <a className="menu-item" id="notifications">
                        <span><i className="uil uil-compass"></i></span><h3>Explore</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-bell"><small className="notification-count"> 9+ </small></i></span><h3>Notifications</h3>

                        <div className="notification-popup">
                            {notifications && notifications.map((n, index) => {
                                return (
                                    <div key={index}>
                                        <div className="profile-photo">

                                            <img src={noone} alt="" />
                                        </div>
                                        <div className="notification-body">
                                            <b>{n.name}</b> accepts your friend request
                                        <small className="text-muted">{n.date}</small>
                                        </div>
                                    </div>
                                )
                            })

                            }

                        </div>
                    </a>
                    <a className="menu-item" id="notification-messages">
                        <span><i className="uil uil-envelope"><small className="notification-count"> 5+ </small></i></span><h3>Message</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-bookmark"></i></span><h3>Bookmarks</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-chart"></i></span><h3>Analytics</h3>
                    </a>
                    <a className="menu-item">
                        <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
                    </a>
                    <a className="menu-item ">
                        <span><i className="uil uil-setting"></i></span><h3>Settings</h3>
                    </a>

                </div>

                <label htmlFor="create-post" className="btn btn-primary">Create Post</label>
            </div>
        </>
    );

}
export default Leftsidebar;
