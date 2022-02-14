import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Single from "./Pages/Single/Single.jsx";
import Write from "./Pages/Write/Write.jsx";
import Settings from "./Pages/SettingsPage/Settings.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.js";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
    
      <Navbar />
      <Switch>

        <Route exact path="/" >
          <Home />
        </Route>
        <Route exact path="/react-blog" >
          <Home />
        </Route>


        <Route path="/write">
        {user ? <Write /> : <Register />}
        </Route>

        <Route path="/settings">
          {user ? <Settings /> : <Register />}
        </Route>

        <Route path="/login">
          {user ? <Home /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
          
    </Router>
    
  );
}

export default App;
