import React from "react";
import {Route, Switch} from 'react-router-dom';
// components
import Landing from './pages/Landing';

import AppNavbar from "./components/NavBar";
import Play from "./pages/Play";
import Instructions from "./pages/Instructions";
import Stats from "./pages/Stats";

export default function App() {
    // global

    return (
        <div className="App">
            <AppNavbar/>
            <Switch>
                <Route path="/2D-BattleRoyale/" component={Landing} exact/>
                <Route path="/2D-BattleRoyale/play" component={Play} exact/>
                <Route path="/2D-BattleRoyale/instructions" component={Instructions} exact/>
                <Route path="/2D-BattleRoyale/stats" component={Stats} exact/>

                <Route path='*'>
                    <div>Not Found</div>
                </Route>
            </Switch>
        </div>
    );
}
