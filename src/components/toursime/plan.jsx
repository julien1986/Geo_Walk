import React, { useContext, useState, useEffect } from "react";
import { render } from "react-dom";
import uid from "uid";

//IMPORT COMPONENT
import Description from "./description";

//TURF
import turf from "turf";

//LEAFLET
import { Map, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//IMPORT CONTEXT
import DataContext from "../../context/DataContext";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function Plan() {
  const { currentParcours, lastUserPosition, setLastUserPosition } = useContext(DataContext);
  const [userPosition, setUserPosition] = useState(lastUserPosition);
  const [showDescription, setShowDescriptionn] = useState(false);
  const [poi, setpoi] = useState();

  //FONCTION POUR MATERIAL-UI

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  //LOCALISE LE USER ET MET SA POSITION À JOUR LORSQU'IL BOUGE
  useEffect(() => {
    //foncton pour aller chercher la position du user
    const user = navigator.geolocation.watchPosition(
      position => {
        //console.log(position);
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLastUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => JSON.stringify(error),
      { enableHighAccuracy: true, timeout: 2000000, maximumAge: 0 }
    );
  }, []);
  //FONCTION POUR AFFICHER LE PANNEAU DÉTAILLÉ LORS DES NOTIFS
  const showMore = poi => {
    setShowDescriptionn(true);
    setpoi(poi);
    console.log("module description appelé");
  };

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

  return (
    <>
      {showDescription ? <Description poi={poi} /> : ""}
      <Map style={{ height: "85vh" }} center={userPosition} zoom={17}>
        {/*affiche la source de la carte -> open street map*/}
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {/*centre la carte sur la position du user*/}
        {userPosition ? <CircleMarker center={userPosition} /> : ""}

        {currentParcours.pois.map(poi => {
          return (
            <Marker icon={redIcon} position={[poi.latitude, poi.longitude]} key={poi.id}>
              <Popup>{poi.name}</Popup>
            </Marker>
          );
        })}

        {userPosition
          ? currentParcours.pois.map(poi => {
              let from = turf.point([userPosition.lat, userPosition.lng]);
              let to = turf.point([poi.latitude, poi.longitude]);
              let distance = turf.distance(from, to);
              //console.log(distance);
              if (distance < 0.01 && poi.visited === false) {
                return (
                  <>
                    <Marker icon={blueIcon} key={poi.id} position={[poi.latitude, poi.longitude]}>
                      <Popup>{poi.name}</Popup>
                    </Marker>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      ContentProps={{
                        "aria-describedby": "message-id"
                      }}
                      message={""}
                      action={[
                        <Button key="undo" color="secondary" size="small" onClick={() => showMore(poi)}>
                          En savoir plus
                        </Button>,
                        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      ]}
                    />
                  </>
                );
              }
              if (distance < 0.01 && poi.visited === true) {
                return (
                  <>
                    <Marker icon={greenIcon} key={poi.id} position={[poi.latitude, poi.longitude]}>
                      <Popup>{poi.name}</Popup>
                    </Marker>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      ContentProps={{
                        "aria-describedby": "message-id"
                      }}
                      message={""}
                      action={[
                        <Button key="undo" color="secondary" size="small" onClick={() => showMore(poi)}>
                          En savoir plus
                        </Button>,
                        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      ]}
                    />
                  </>
                );
              }
            })
          : ""}
      </Map>
    </>
  );
}
