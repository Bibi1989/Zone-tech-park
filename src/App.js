import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// imported components
import NavBar from "./components/NavBar/NavBar";
import Seasons from "./components/Seasons/Seasons";

// store
import { MovieProvider } from "./context/MovieProvider";

function App() {
  return (
    <MovieProvider>
      <Router>
        <AppStyle>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              <Seasons />
            </Route>
          </Switch>
        </AppStyle>
      </Router>
    </MovieProvider>
  );
}

export default App;

const AppStyle = styled.div`
  background: #181818;
  color: white;
`;
