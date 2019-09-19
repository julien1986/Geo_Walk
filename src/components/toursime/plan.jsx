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

  //LOCALISE LE USER ET MET SA POSITION À JOUR LORSQU'IL BOUGE
  useEffect(() => {
    //foncton pour aller chercher la position du user
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
  }, []);

  //ICON POUR LEAFLET
  let blueIcon = new L.Icon({
    iconUrl: "img/marker-icon-2x-blue.png",
    shadowUrl: "img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  let redIcon = new L.Icon({
    iconRetinaUrl: "img/marker-icon-2x-red.png",
    iconUrl: "img/marker-icon-red.png",
    shadowUrl: "img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  let greenIcon = new L.Icon({
    iconUrl: "img/marker-icon-2x-green.png",
    shadowUrl: "img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // const distance = (lat1, lon1, lat2, lon2, unit) => {
  //   if (lat1 === lat2 && lon1 === lon2) {
  //     return 0;
  //   } else {
  //     let radlat1 = (Math.PI * lat1) / 180;
  //     let radlat2 = (Math.PI * lat2) / 180;
  //     let theta = lon1 - lon2;
  //     let radtheta = (Math.PI * theta) / 180;
  //     let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  //     if (dist > 1) {
  //       dist = 1;
  //     }
  //     dist = Math.acos(dist);
  //     dist = (dist * 180) / Math.PI;
  //     dist = dist * 60 * 1.1515;

  //     if (unit === "K") {
  //       dist = dist * 1.609344;
  //     }

  //     if (unit === "N") {
  //       dist = dist * 0.8684;
  //     }
  //     //return dist;
  //     return dist;
  //   }
  // };

  const distance = (userLat, userLng, poiLat, poiLng) => {
    let from = turf.point([userLat, userLng]);
    let to = turf.point([poiLat, poiLng]);

    let distance = turf.distance(from, to);
  };

  return (
    <Map style={{ height: "100vh" }} center={userPosition} zoom={17}>
      {/*affiche la source de la carte -> open street map*/}
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

      {/*centre la carte sur la position du user*/}
      {userPosition ? <CircleMarker center={userPosition} /> : ""}

      {currentParcours.pois.map(poi => (
        <Marker
          icon={redIcon}
          key={uid()}
          position={[poi.latitude, poi.longitude]}
          onClick={() => {
            distance(userPosition.lat, userPosition.lng, poi.latitude, poi.longitude);
          }}
        >
          <Popup>{poi.name}</Popup>
        </Marker>
      ))}
    </Map>
  );
}

// <Marker icon={blueIcon} key={uid()} position={[50.471066, 4.468738]} onClick={() => distance(userPosition.lat, userPosition.lng, 50.471066, 4.468738, "K")}>
//           <Popup>Cepegra en dur</Popup>
//         </Marker>
