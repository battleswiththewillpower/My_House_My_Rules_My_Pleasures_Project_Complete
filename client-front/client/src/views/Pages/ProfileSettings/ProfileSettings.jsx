import React, { useContext, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import './ProfileSettings.css'
import topban from '../../../assets-copy/images/Tiffany_x_Reed.png'
import { Context } from "../../../context/Context";
import axios from "axios";

const ProfileSettings = () => {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const PF = `http://localhost:8000/images/`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post(`http://localhost:8000/api/upload`, data);
            } catch (err) { 
                console.log(err)
            }
        }
        try {
            const res = await axios.put(`http://localhost:8000/api/users/` + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

        return (
            <div className='body'>
                <div className='settings'>
                    <div className="settingswrapp">
                        <div className="settingsTitle">
                            <span className="settingsUpdateTitle">Update Your Account</span>
                            <span className="settingsDeleteTitle">Delete Account</span>
                        </div>
                        <form className='settingsForm' onSubmit={handleSubmit}>
                            <label >Profile Picture</label>
                            <div className="settingsPic">
                                <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" />
                                <label htmlFor="fileInput">
                                    <i className="settingsPPIcon far fa-user-circle"></i> </label>
                                <input className='settingsPPInput' type="file" id='fileInput' style={{ display: "none" }} 
                                onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <label >UserName</label>
                            <input type="text" placeholder={user.username} 
                            onChange={(e)=> setUsername(e.target.value)}
                            />
                            <label >Email</label>
                            <input type="email" placeholder={user.email} 
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                            <label >Password</label>
                            <input type="password" placeholder='password' 
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='btn'>Update</button>
                            {success && (
                                <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated!</span>
                            )}

                        </form>


                    </div>
                    <Sidebar />
                </div>
            </div>
        )
    }

export default ProfileSettings