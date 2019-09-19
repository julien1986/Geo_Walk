import React, { useContext, useState, useEffect } from "react";
import { render } from "react-dom";
import uid from "uid";

//TURF
import turf from "turf";

//LEAFLET
import { Map, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//SEMANTIC UI
import { Container } from "semantic-ui-react";
//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

export default function Plan() {
  const { currentParcours } = useContext(DataContext);
  const [lastUserPosition, setLastUserPosition] = useState();
  const [userPosition, setUserPosition] = useState(lastUserPosition);
  let color = "red";
  let icon = new L.Icon({
    iconRetinaUrl: `img/marker-icon-2x-${color}.png`,
    iconUrl: "img/marker-icon-red.png",
    shadowUrl: "img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  //LOCALISE LE USER ET MET SA POSITION À JOUR LORSQU'IL BOUGE
  useEffect(() => {
    //fonction pour aller chercher la position du user
    const user = navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLastUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
    const timer = () => {
      setInterval(user, 500);
    };
  },
  []);

  const handleDistance = (userLat, userLng, poiLat, poiLng) => {
    let from = turf.point([userLat, userLng]);
    let to = turf.point([poiLat, poiLng]);

    let distance = turf.distance(from, to);

    console.log(distance)
    return distance;
  }



  return (
    <Map style={{ height: "100vh" }} center={userPosition} zoom={17}>
      {/*affiche la source de la carte -> open street map*/}
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      {/*centre la carte sur la position du user*/}
      {userPosition ? <CircleMarker center={userPosition} /> : ""}
      
      {currentParcours.pois.map(poi => (
        () => handleDistance(poi.latitude, poi.)
        <Marker
          icon={distance > 0.01 ? color = "blue" : color = "red"}
          key={uid()}
          position={[poi.latitude, poi.longitude]}>
            <Popup>{poi.name}</Popup>
        </Marker>
      ))}
    </Map>
  );
}

// <Marker icon={blueIcon} key={uid()} position={[50.471066, 4.468738]} onClick={() => distance(userPosition.lat, userPosition.lng, 50.471066, 4.468738, "K")}>
//           <Popup>Cepegra en dur</Popup>
//         </Marker>


// onClick={() => {
//   distance(userPosition.lat, userPosition.lng, poi.latitude, poi.longitude);