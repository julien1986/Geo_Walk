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
  const [url, setUrl] = useState("http://10.1.107.9:8080");

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
    getTripsLS !== null ? setTrips(getTripsLS) : setTrips([{ id: 1, trip_name: "Gosselies", categorie: "Formations", created_at: "2019-09-12T09:12:55.000Z", updated_at: "2019-09-12T09:12:55.000Z", pois: [{ id: 2, latitude: 50.470042, longitude: 4.462641, name: "Technocampus", description: "TechnoCampus se veut le centre de référence en matière de formation et de sensibilisation aux métiers technologiques.", medias: { image: "http://www.technocampus.be/wp-content/uploads/2015/11/SiegeSocial.jpg" }, created_at: "2019-09-12T09:10:50.000Z", updated_at: "2019-09-20T09:56:06.000Z", visited: false }, { id: 1, latitude: 50.471127, longitude: 4.468706, name: "Centre de compétence/Forem Cepegra", description: "Le Cepegra, Centre de compétence du Forem, aide les professionnels du secteur de la communication visuelle et de l’industrie graphique (graphistes, web designers, web communicants, imprimeurs…) à rester à la pointe de la technologie et à être ainsi plus compétitifs.", medias: { image: "https://formation-cepegra.be/wp-content/uploads/2016/11/cepegra.png" }, created_at: "2019-09-12T09:07:27.000Z", updated_at: "2019-09-20T09:53:31.000Z", visited: false }, { id: 3, latitude: 50.476362, longitude: 4.472978, name: "Technofutur TIC", description: "Au-delà des programmes variés et adaptés aux spécificités de publics souvent différents, agissent plusieurs équipes, qui sont autant de Pôles ou de Départements.", medias: { image: "http://www.metiers-du-web.com/wp-content/uploads/2010/02/technofuturtic1.jpg" }, created_at: "2019-09-12T09:12:23.000Z", updated_at: "2019-09-20T09:57:02.000Z", visited: false }] }]);
  }, []);

  return (
    <div className="App">
      <DataProvider
        value={{
          setTrips: setTrips,
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
