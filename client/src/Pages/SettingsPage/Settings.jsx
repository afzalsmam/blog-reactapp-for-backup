import "./settings.css";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { UpdateFailure, UpdateStart, UpdateSuccess, LogOut } from "../../context/Actions";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Settings() {
    const PF = "http://localhost:5000/images/";

    const {user, dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(false);
    const [deletedNotification, setDeletedNotification] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(UpdateStart()); //retrieving functions from Actions.js with each action corresponding to the Reducer.js in which we assigned values for objects like user, isFetching, and error. And then the context uses the reducer to update the localStorage to the new values. Need to learn more about Context API!!
        const updatedUser = {
            userId: user._id,             
            username,
            email,
            password,
        };
        if (file) {
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePicture = filename;
            try {
              await axios.post("/upload", data);
            } catch (err) {console.log("error occured");}
          }
          try {
            const res = await axios.put("/users/"+user._id, updatedUser);
            dispatch(UpdateSuccess(res.data));
            setNotification(true);
        } catch (err) {
              console.log("error occured while sending to post");
              dispatch(UpdateFailure());
            }
        
    };

    const handleDelete = async () => {
        try{
            await axios.delete(`/users/${user._id}`, {
                data: {userId: user._id},  //This is used to provide userId of the user since we dont provide the userId ourselves so it will fetch the useId from out database and match it with the parameter (we dont have it but it will provide automatically) and then delete it. Remember we have if condition to check whether the userId mathces with the req.body.userId!
            })
            setDeletedNotification(true);
            dispatch(LogOut());
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <Link className="link" to="/login">
                    <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
                    </Link>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>
                        Profile Picture
                    </label>
                    <div className="settingsPP">
                        <img 
                            src={file ? URL.createObjectURL(file) : PF+user.profilePicture} 
                            alt="profile pic"

                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                            onChange={e =>setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="name" onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="settingsSubmitButton" type="submit" >
                        Update
                    </button>
                    {notification && <span style={{color:"green", marginTop:"20px", textAlign:"center"}}>User updated Succesfully!</span>}
                    {deletedNotification && <span style={{color:"green", marginTop:"20px", textAlign:"center"}}>User has been deleted Succesfully!</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
