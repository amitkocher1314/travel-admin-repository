import React from "react";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={AdminDashboard} />
                <Route exact path="/" component={SignIn} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
