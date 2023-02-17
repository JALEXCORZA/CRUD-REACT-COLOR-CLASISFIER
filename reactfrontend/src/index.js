import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/home";
import Probar from "./components/probar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css";
import Login from "./components/login";
import Color from "./components/color"

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Proyecto/">
                    <Login />
                </Route>
                <Route exact path="/Proyecto/home">
                    <Home />
                </Route>
                <Route exact path="/Proyecto/color">
                    <Color />
                </Route>
                <Route exact path="/Proyecto/probar">
                    <Probar />
                </Route>
              
                <Route path="*" render={() => <h1>RECURSO NO ENCONTRADO</h1>} />
            </Switch>
        </div>
    );
}
export default App;