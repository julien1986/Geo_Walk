import React, { useContext, useState } from "react";
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

  const [trips, setTrips] = useState([]);
 
  const tripsSetter = (newtrips)=>{
    if (Array.isArray(newtrips)){
    setTrips([...trips, ...newtrips])
  } else {setTrips([...trips, newtrips])}
  }

  return (
    <div className="App">
    <DataProvider
      value={{
        setTripsContext: tripsSetter,
        listTrips: trips
      }}
    >
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
                <Route>
                  <Link to="/">
                    <Button>Retour</Button>
                  </Link>
                </Route>
                <Tourisme />
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
    </DataProvider>
    </div>
  );
}

export default App;
