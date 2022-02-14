import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { LogOut } from "../../context/Actions";
import "./navbar.css"

export default function Navbar() {
  const PF = "http://localhost:5000/images/";
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch(LogOut());
  }
    return (
      <div className="top">
        <div className="topLeft">
        {user ? (<Link className="link" to="/settings">
          <img 
            className="topImg" 
            src={PF+user.profilePicture} 
            alt="profilePicture"
          />
          
        </Link> ) : (<ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
          )}

          {user && <h3 className="profileUserName">{user.username}</h3>}
        
        </div>

        <div className='topCenter'>
          <ul className="topList">
            <li className="topListItem"><Link className= "link" to="/">DISCOVER</Link> </li>
            <li className="topListItem"><Link className= "link" to="/">{user && "FOR YOU"}</Link> </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            <Link className= "link" to="/login">
              {user && "LOGOUT"}
            </Link>
          </li>
          <i className="topSearchIcon fas fa-search"></i>
          <input className="input_search" placeholder="Search"></input>
          </ul>  
          
        </div>
        
      </div>
        
    );
}
