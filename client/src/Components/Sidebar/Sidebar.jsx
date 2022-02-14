import "./sidebar.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";


export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/";


  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        { user ? 
          <img className="sideBarDP" src={PF + user.profilePicture} alt=""/> 
          : null
        }

        {user && <h3 className="sideProfileUserName">{user.username}</h3>}

        <p className="userProfession">
          Photographer
        </p>
      </div>

        <p className="userDescription">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=>(
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
            
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
