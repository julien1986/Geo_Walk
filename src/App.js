import React, { useContext } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./scss/App.scss";
import { Container, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

//IMPORT CONPONENTS
import Tourisme from "./components/tourisme";
import Jeux from "./components/jeux";

//IMPORT CONTEXT
import { DataProvider } from "./context/DataContext";

function App() {
  const HandleBackTourisme = () => {};

  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <Link to="/tourisme">
                <Button>TOURISME</Button>
              </Link>
              <Link to="/jeux">
                <Button>JEUX</Button>
              </Link>
            </Route>
            <Route exact path="/tourisme">
              <DataProvider>
                <Route>
                  <Link to="/">
                    <Button>Retour</Button>
                  </Link>
                </Route>
                <Tourisme />
              </DataProvider>
            </Route>
            <Route exact path="/jeux">
              <Route>
                <Link to="/">
                  <Button>Retour</Button>
                </Link>
              </Route>
              <Jeux />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
