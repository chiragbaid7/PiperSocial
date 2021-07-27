import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Suggestions from "./components/Suggestions";
import Profile from "./components/Profile";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/home/Suggestions">
            <Suggestions />
          </Route>
          <Route path={`/home/profile/:name`}>
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
