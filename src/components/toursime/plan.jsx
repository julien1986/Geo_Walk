import React, { useState } from "react";

//SEMANTIC UI
import { Container } from "semantic-ui-react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

//LEAFLET
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

//PIGEONS-MAP
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";

//créer le state qui va utiliser la requete vers les différents POI

export default function Plan() {
  const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

  const [position, setPosition] = useState({
    lat: 50.4708,
    lng: 4.47,
    zoom: 17
  });

  
  
  return <div id="map"></div>;
}