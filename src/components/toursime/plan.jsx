import React, { useContext, useState, useEffect } from "react";
import { render } from "react-dom";
import uid from "uid";

//LEAFLET
import { Map, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//SEMANTIC UI
import { Container } from "semantic-ui-react";
//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

//créer le state qui va utiliser la requete vers les différents POI

export default function Plan() {
  const { currentParcours } = useContext(DataContext);
  const [userPosition, setUserPosition] = useState();

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        console.log(position);
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, []);

  //Solution trouvée sur le net pour palier au fait que l'icone par défaut de posistion ne s'affiche pas
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
  //fin de solution

  //j'enregistre la position centrale du parcours
  const [getPosition, setPosition] = useState({ lat: "50.471066", lng: "4.468738", zoom: "17" });
  const position = [getPosition.lat, getPosition.lng];

  return (
    <Map style={{ height: "100vh" }} center={position} zoom={getPosition.zoom}>
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      {userPosition ? <CircleMarker center={userPosition} /> : ""}
    </Map>
  );
}
