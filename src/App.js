import React, { useContext, useState, useEffect } from "react";
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
  const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState("http://10.1.107.3:8080");

  const [showmap, setShowmap] = useState(false);
  const [currentParcours, setCurrentParcours] = useState();
  const [lastUserPosition, setLastUserPosition] = useState();

  const handleClick = parcours => {
    setCurrentParcours(parcours);
    setShowmap(true);
  };
  const handleBack = () => {
    setCurrentParcours("");
    setShowmap(false);
    console.log(showmap);
  };
  const handleBackList = () => {
    setCurrentParcours("");
    setShowmap(false);
    console.log(showmap);
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLastUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => JSON.stringify(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  };

  const tripsSetter = newtrips => {
    if (Array.isArray(newtrips)) {
      setTrips([...trips, ...newtrips]);
    } else {
      setTrips([...trips, newtrips]);
    }
  };
  //AU CHARGEMENT, ON MET LE LOCAL STORAGE DANS LE CONTEXT
  useEffect(() => {
    const getTripsLS = JSON.parse(localStorage.getItem("getTrips"));
    getTripsLS !== null ? setTrips(getTripsLS) : setTrips([]);
  }, []);

  return (
    <div className="App">
      <DataProvider
        value={{
          setTripsContext: tripsSetter,
          listTrips: trips,
          url: url,
          currentParcours: currentParcours,
          setCurrentParcours: setCurrentParcours,
          showmap: showmap,
          setShowmap: setShowmap,
          handleClick: handleClick,
          lastUserPosition: lastUserPosition,
          setLastUserPosition: setLastUserPosition
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
                  {!showmap ? (
                    <Link to="/" onClick={handleBack}>
                      <Button>Retour</Button>
                    </Link>
                  ) : (
                    <Link to="/tourisme" onClick={handleBackList}>
                      <Button>Retour</Button>
                    </Link>
                  )}
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
